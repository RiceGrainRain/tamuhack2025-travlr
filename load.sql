
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Employees;
DROP TABLE IF EXISTS Food;
DROP TABLE IF EXISTS Flight_Orders;
DROP TABLE IF EXISTS Flights;
DROP TABLE IF EXISTS Reviews;
DROP TABLE IF EXISTS Requests;




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
    Flight_ID INTEGER,
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

CREATE TABLE Flights (
    Flight_ID VARCHAR(8) NOT NULL,
    Depart VARCHAR(3) NOT NULL,
    Dest VARCHAR(3) NOT NULL,
    Depart_Time INTEGER NOT NULL,
    Dest_Time INTEGER NOT NULL,
    Depart_Gate VARCHAR(3) NOT NULL,
    Dest_Gate VARCHAR(3) NOT NULL
);


INSERT INTO Customers (Customer_ID, First_Name, Last_Name, Password_, Email_Address, Flight_ID, Seat) VALUES (10, 'John', 'Doe', '123', 'johndoe@gmail.com', 1234, 'A12');
INSERT INTO Customers (Customer_ID, First_Name, Last_Name, Password_, Email_Address, Flight_ID, Seat) VALUES (200, 'Haley', 'White', 'apple', 'hwhite@gmail.com', 1234, 'A24');
INSERT INTO Flights (Flight_ID, Depart, Dest, Depart_Time, Dest_Time, Depart_Gate, Dest_Gate) VALUES (1234, 'JFK', 'LAX', 1030, 1700, 'B15', 'C50');
INSERT INTO Employees (Employee_ID, First_Name, Last_Name, Password_, Email_Address, Flight_ID) VALUES (1, 'Seth', 'Brown', 'sb1', 'sethb@gmail.com', 1234);
INSERT INTO Requests (Seat, Request) VALUES ('A12', 'The window will not close');
INSERT INTO Requests (Seat, Request) VALUES ('A24', 'Could I get a bottle of water');
INSERT INTO Customers (Customer_ID, First_Name, Last_Name, Password_, Email_Address, Flight_ID, Seat) VALUES (12, 'Jane', 'Jones', 'pw', 'jane2024@gmail.com', 1543, 'A05');
INSERT INTO Flights (Flight_ID, Depart, Dest, Depart_Time, Dest_Time, Depart_Gate, Dest_Gate) VALUES (1543, 'IAH', 'DFW', 1230, 1400, 'A10', 'A29');
INSERT INTO Flights (Flight_ID, Depart, Dest, Depart_Time, Dest_Time, Depart_Gate, Dest_Gate) VALUES (9362, 'DEN', 'MIA', 1000, 1400, 'B31', 'D12');