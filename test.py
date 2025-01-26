import sys
sys.path.append('lib')

import psycopg2

# Database connection details
endpoint = "aa-database.cjfahtrmutjv.us-east-1.rds.amazonaws.com"
database = ""  # Change if you named your DB differently
username = "postgres"
password = "xrv.qgd*ubv3UBA9tdn"
port = 5432

def new_customer(i, f, l, p, e):
    try:
        conn = psycopg2.connect(
            host=endpoint,
            database=database,
            user=username,
            password=password,
            port=port
        )
        print("Connected to the database!")
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        exit()

    # Cursor to execute queries
    cursor = conn.cursor()
    query = """INSERT INTO Customers (Customer_ID, First_Name, Last_Name, Password_, Email_Address) VALUES (%s, %s, %s, %s, %s);"""
    cursor.execute(query, (i, f, l, p, e))
    fh = str(i) + "_flights"
    queryfh = """CREATE TABLE %s (Date_ VARCHAR(8) NOT NULL, Flight_ID INTEGER NOT NULL, Depart VARCHAR(3) NOT NULL, Dest VARCHAR(3) NOT NULL, PRIMARY KEY (Flight_ID));"""
    cursor.execute(queryfh, (fh))
    oh = str(i) + "_orders"
    queryoh = """CREATE TABLE %s (Date_ VARCHAR(8) NOT NULL, Food_Name TEXT NOT NULL, Price NUMERIC(3,2) NOT NULL)"""
    cursor.execute(queryoh, (oh))
    conn.commit()
    print("Inserted customer successfully!")
    conn.close()

def new_employee(i, f, l, p, e):
    try:
        conn = psycopg2.connect(
            host=endpoint,
            database=database,
            user=username,
            password=password,
            port=port
        )
        print("Connected to the database!")
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        exit()

    # Cursor to execute queries
    cursor = conn.cursor()
    query = """INSERT INTO Employees (Employee_ID, First_Name, Last_Name, Password_, Email_Address) VALUES (%s, %s, %s, %s, %s);"""
    cursor.execute(query, (i, f, l, p, e))
    conn.commit()
    print("Inserted employee successfully!")
    conn.close()

def new_order(ci, fi, s, c):
    try:
        conn = psycopg2.connect(
            host=endpoint,
            database=database,
            user=username,
            password=password,
            port=port
        )
        print("Connected to the database!")
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        exit()

    # Cursor to execute queries
    cursor = conn.cursor()
    query = """INSERT INTO Flight_Orders (Customer_ID, Food_ID, Seat, Completed) VALUES (%s, %s, %s, %s);"""
    cursor.execute(query, (ci, fi, s, c))
    conn.commit()
    print("Inserted order successfully!")
    conn.close()

def new_review(d, fi, ci, ra, re):
    try:
        conn = psycopg2.connect(
            host=endpoint,
            database=database,
            user=username,
            password=password,
            port=port
        )
        print("Connected to the database!")
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        exit()

    # Cursor to execute queries
    cursor = conn.cursor()
    query = """INSERT INTO Reviews (Date_, Flight_ID, Customer_ID, Rating, Review) VALUES (%s, %s, %s, %s, %s);"""
    cursor.execute(query, (d, fi, ci, ra, re))
    conn.commit()
    print("Inserted review successfully!")
    conn.close()





# Connect to the database
try:
    conn = psycopg2.connect(
        host=endpoint,
        database=database,
        user=username,
        password=password,
        port=port
    )
    print("Connected to the database!")
except Exception as e:
    print(f"Error connecting to the database: {e}")
    exit()

# Cursor to execute queries
cursor = conn.cursor()

# Example: Insert data into Employees table
cursor.execute("""CREATE TABLE Customers ()""")
conn.commit()
print("Inserted data successfully!")

# Example: Retrieve data from Employees table
'''
cursor.execute("SELECT *;")
rows = cursor.fetchall()
for row in rows:
    print(row)

# Close the connection
cursor.close()
'''
conn.close()
