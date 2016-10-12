/* Replace with your SQL commands */
-- We use UUID table IDS which is included since PostgreSQL 8.3
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- We use pg_trgm to accelerate indices when using LIKE/ILIKE comparisons,
-- which is included since PostgreSQL 8.4
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

--
--  Data types
--

CREATE TYPE sale_status AS ENUM ('initial', 'quote', 'ordered', 'confirmed',
                                 'cancelled', 'returned', 'renegotiated');
CREATE TYPE payment_status AS ENUM ('preview', 'pending', 'paid',
                                    'reviewing', 'confirmed', 'cancelled');
CREATE TYPE payment_type AS ENUM ('in', 'out');
CREATE TYPE work_order_status AS ENUM ('opened', 'cancelled', 'waiting',
                                       'in-progress', 'finished', 'delivered');
CREATE TYPE work_order_package_status AS ENUM ('opened', 'sent', 'received');
CREATE TYPE credit_card_type AS ENUM ('credit', 'debit', 'credit-inst-store',
                                      'credit-inst-provider', 'debit-pre-dated');
CREATE TYPE payment_category_type AS ENUM ('payable', 'receivable');
CREATE TYPE account_type AS ENUM ('bank', 'cash', 'asset', 'credit',
                                  'income', 'expense', 'equity' );
CREATE TYPE event_type AS ENUM ('system', 'user', 'order', 'sale', 'payment');
CREATE TYPE inventory_status AS ENUM ('open', 'closed', 'cancelled');
CREATE TYPE loan_status AS ENUM ('open', 'closed');
CREATE TYPE credit_check_status AS ENUM ('included', 'not-included');
CREATE TYPE marital_status AS ENUM ('single', 'married', 'divorced',
                                    'widowed', 'separeted', 'cohabitation');
CREATE TYPE individual_gender AS ENUM ('male', 'female');
CREATE TYPE client_status AS ENUM ('solvent', 'indebt', 'insolvent', 'inactive');
CREATE TYPE supplier_status AS ENUM ('active', 'inactive', 'blocked');
CREATE TYPE employee_status AS ENUM ('normal', 'away', 'vacation', 'off');
CREATE TYPE stock_transaction_history_type AS ENUM ('initial', 'sell',
    'returned-sale', 'cancelled-sale', 'received-purchase', 'returned-loan',
    'loan', 'production-allocated', 'production-produced',
    'production-returned', 'stock-decrease', 'transfer-from', 'transfer-to',
    'inventory-adjust', 'production-sent', 'imported', 'consignment-returned',
    'wo-used', 'wo-returned-to-stock', 'sale-reserved');
CREATE TYPE product_quality_test_type AS ENUM ('boolean', 'decimal');
CREATE TYPE production_order_status AS ENUM ('opened', 'waiting', 'producing',
    'closed', 'quality-assurance', 'cancelled');
CREATE TYPE purchase_order_status AS ENUM ('quoting', 'pending', 'confirmed',
                                           'consigned', 'cancelled','closed');
CREATE TYPE purchase_order_freight_type AS ENUM ('fob', 'cif');
CREATE TYPE receiving_order_status AS ENUM ('pending', 'closed');
CREATE TYPE receiving_order_freight_type AS ENUM ('fob-payment', 'fob-installments',
                                            'cif-unknown', 'cif-invoice');
CREATE TYPE delivery_status AS ENUM ('initial', 'sent', 'received');
CREATE TYPE sellable_status AS ENUM ('available', 'closed');
CREATE TYPE stock_decrease_status AS ENUM ('initial', 'confirmed');
CREATE TYPE till_status AS ENUM ('pending', 'open', 'closed');
CREATE TYPE transfer_order_status AS ENUM ('pending', 'sent', 'received');
CREATE TYPE account_transaction_operation_type AS ENUM ('in', 'out');
CREATE TYPE returned_sale_status AS ENUM ('pending', 'confirmed');



CREATE OR REPLACE FUNCTION stoq_create_language_plpgsql()
RETURNS VOID
LANGUAGE SQL
AS $$
CREATE LANGUAGE plpgsql;
$$;

SELECT
    CASE
    WHEN EXISTS(
        SELECT 1
        FROM pg_catalog.pg_language
        WHERE lanname = 'plpgsql'
    )
    THEN NULL
    ELSE stoq_create_language_plpgsql() END;

DROP FUNCTION stoq_create_language_plpgsql();

-- Enable unaccent extension
CREATE EXTENSION IF NOT EXISTS unaccent;

CREATE OR REPLACE FUNCTION stoq_normalize_string(input_string text) RETURNS text AS $$
BEGIN
  input_string := LOWER(input_string);
  return unaccent(input_string);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Returns a default te_id for the domain tables
CREATE OR REPLACE FUNCTION new_te() RETURNS integer AS $$
    DECLARE te_id integer;
BEGIN
    INSERT INTO transaction_entry (te_time, dirty) VALUES (STATEMENT_TIMESTAMP(), true) RETURNING id INTO te_id;
    RETURN te_id;
END;
$$ LANGUAGE plpgsql;

-- Updates the transaction entry for the given id
CREATE OR REPLACE FUNCTION update_te(te_id bigint) RETURNS void AS $$
BEGIN
    UPDATE transaction_entry SET te_time = STATEMENT_TIMESTAMP(), dirty = true WHERE id = $1;
END;
$$ LANGUAGE plpgsql;
