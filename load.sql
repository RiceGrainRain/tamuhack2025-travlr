DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Employees;
DROP TABLE IF EXISTS Food;
DROP TABLE IF EXISTS Flight_Orders;
DROP TABLE IF EXISTS Reviews;

CREATE TABLE Customers (
    Customer_ID INTEGER NOT NULL,
    First_Name VARCHAR(10) NOT NULL,
    Last_Name VARCHAR(15) NOT NULL,
    Password_ TEXT,
    Email_Address TEXT,
    Flight_Number INTEGER,
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
    Email_Address TEXT,
    Flight_Number INTEGER,
    PRIMARY KEY (Employee_ID)
);

CREATE TABLE Food (
    Food_ID INTEGER NOT NULL,
    Food_Name TEXT NOT NULL,
    Price NUMERIC(3,2) NOT NULL,
    PRIMARY KEY (Food_ID)
);

CREATE TABLE Flight_Orders (
    Customer_ID INTEGER NOT NULL,
    Food_ID INTEGER NOT NULL,
    Seat VARCHAR(3) NOT NULL,
    Completed BOOLEAN,
    PRIMARY KEY (Seat)
);

CREATE TABLE Reviews (
    Date_ VARCHAR(8) NOT NULL,
    Flight_ID INTEGER NOT NULL,
    Customer_ID INTEGER NOT NULL,
    Rating INTEGER NOT NULL,
    Review TEXT NOT NULL,
    PRIMARY KEY (Flight_ID, Customer_ID)
);

CREATE TABLE Flights (
    Flight_ID INTEGER NOT NULL,
    Depart VARCHAR(3) NOT NULL,
    Dest VARCHAR(3) NOT NULL,
    PRIMARY KEY (Flight_ID)
);