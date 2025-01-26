DO $$ 
DECLARE
    user_record RECORD;
    orders_table_name TEXT;
    flights_table_name TEXT;
BEGIN
    -- Step 1: Loop through all user IDs
    FOR user_record IN SELECT customer_id FROM Customers LOOP
        -- Step 2: Generate table names
        orders_table_name := 'orders_' || user_record.id;
        flights_table_name := 'flights_' || user_record.id;

        -- Step 3: Drop the tables if they exist
        EXECUTE 'DROP TABLE IF EXISTS ' || orders_table_name;
        EXECUTE 'DROP TABLE IF EXISTS ' || flights_table_name;
    END LOOP;
END $$;


DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Employees;
DROP TABLE IF EXISTS Food;
DROP TABLE IF EXISTS Flight_Orders;
DROP TABLE IF EXISTS Flights;
DROP TABLE IF EXISTS Reviews;
DROP TABLE IF EXISTS Requests;

CREATE TABLE Flights (
    Flight_ID VARCHAR(8) NOT NULL,
    Depart VARCHAR(3) NOT NULL,
    Dest VARCHAR(3) NOT NULL,
    Depart_Time INTEGER NOT NULL,
    Dest_Time INTEGER NOT NULL,
    Depart_Gate VARCHAR(3) NOT NULL,
    Dest_Gate VARCHAR(3) NOT NULL
);


CREATE TABLE Customers (
    Customer_ID INTEGER NOT NULL,
    First_Name VARCHAR(10) NOT NULL,
    Last_Name VARCHAR(15) NOT NULL,
    Password_ TEXT,
    Email_Address TEXT UNIQUE,
    Flight_ID INTEGER,
    Seat VARCHAR(3),
    Checked_In BOOLEAN,
    Passed_Security BOOLEAN,
    On_Flight BOOLEAN,
    Credits NUMERIC(10,2),
    PRIMARY KEY (Customer_ID)
);

CREATE TABLE Employees (
    Employee_ID INTEGER NOT NULL,
    First_Name VARCHAR(10) NOT NULL,
    Last_Name VARCHAR(15) NOT NULL,
    Password_ TEXT,
    Email_Address TEXT UNIQUE,
    Flight_Number INTEGER,
    PRIMARY KEY (Employee_ID)
);

CREATE TABLE Food (
    Food_ID INTEGER NOT NULL PRIMARY KEY,
    Food_Name TEXT NOT NULL,
    Price NUMERIC(3,2) NOT NULL
);

CREATE TABLE Flight_Orders (
    Customer_ID INTEGER NOT NULL,
    Food_ID INTEGER NOT NULL,
    Seat VARCHAR(3) NOT NULL,
    Completed BOOLEAN,
    PRIMARY KEY (Customer_ID)
);

CREATE TABLE Reviews (
    Flight_ID VARCHAR(8) NOT NULL,
    Customer_ID INTEGER NOT NULL,
    Rating INTEGER NOT NULL,
    Review TEXT NOT NULL,
    PRIMARY KEY (Flight_ID, Customer_ID)
);

CREATE TABLE Requests (
    Request_ID SERIAL,
    Seat VARCHAR(3) NOT NULL,
    Request TEXT NOT NULL,
    PRIMARY KEY (Request_ID)
);


 
