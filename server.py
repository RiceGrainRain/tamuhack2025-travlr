import sys
sys.path.append('lib')

from flask import Flask, request, jsonify, make_response
import psycopg2
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app, resources={r"/*": {
    "origins": "*",
    "methods": ["GET", "POST", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization"]
}})

# Database connection details
DATABASE_CONFIG = {
    'host': "aa-database.cjfahtrmutjv.us-east-1.rds.amazonaws.com",
    'database': "",  # Change if you named your DB differently
    'user': "postgres",
    'password': "xrv.qgd*ubv3UBA9tdn",
    'port': 5432
}

# Configure logging
logging.basicConfig(level=logging.DEBUG)

def get_db_connection():
    try:
        conn = psycopg2.connect(**DATABASE_CONFIG)
        return conn
    except Exception as e:
        app.logger.error(f"Database connection error: {e}")
        return None

# OPTIONS handlers for preflight requests
@app.route('/new_customer', methods=['OPTIONS'])
@app.route('/new_employee', methods=['OPTIONS'])
@app.route('/new_order', methods=['OPTIONS'])
@app.route('/new_review', methods=['OPTIONS'])
@app.route('/login_customer', methods=['OPTIONS'])
@app.route('/login_employee', methods=['OPTIONS'])

@app.route('')
def handle_options():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    return response

# Decorator to add CORS headers to all responses
def add_cors_headers(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/new_customer', methods=['POST'])
def new_customer():
    app.logger.debug(f"Received request: {request.method} {request.url}")
    data = request.json
    try:
        conn = get_db_connection()
        if not conn:
            return add_cors_headers(jsonify({"error": "Database connection failed"})), 500

        cursor = conn.cursor()
        query = """INSERT INTO Customers (Customer_ID, First_Name, Last_Name, Password_, Email_Address) VALUES (%s, %s, %s, %s, %s);"""
        cursor.execute(query, (
            data['id'], 
            data['first_name'], 
            data['last_name'], 
            data['password'], 
            data['email']
        ))
        
        fh = f"{data['id']}_flights"
        queryfh = f"""CREATE TABLE "{fh}" (
            Date_ VARCHAR(8) NOT NULL, 
            Flight_ID INTEGER NOT NULL, 
            Depart VARCHAR(3) NOT NULL, 
            Dest VARCHAR(3) NOT NULL, 
            PRIMARY KEY (Flight_ID)
        );"""
        cursor.execute(queryfh)
        
        oh = f"{data['id']}_orders"
        queryoh = f"""CREATE TABLE "{oh}" (
            Date_ VARCHAR(8) NOT NULL, 
            Food_Name TEXT NOT NULL, 
            Price NUMERIC(3,2) NOT NULL
        );"""
        cursor.execute(queryoh)
        
        conn.commit()
        conn.close()
        return add_cors_headers(jsonify({"message": "Customer inserted successfully"})), 201
    except Exception as e:
        app.logger.error(f"Error in new_customer: {e}")
        return add_cors_headers(jsonify({"error": str(e)})), 400

# Similar modifications for other routes (new_employee, new_order, new_review, login_customer, login_employee)
# Each route should:
# 1. Use add_cors_headers() for responses
# 2. Add logging 
# 3. Keep existing logic

@app.route('/new_employee', methods=['POST'])
def new_employee():
    app.logger.debug(f"Received request: {request.method} {request.url}")
    data = request.json
    try:
        conn = get_db_connection()
        if not conn:
            return add_cors_headers(jsonify({"error": "Database connection failed"})), 500

        cursor = conn.cursor()
        query = """INSERT INTO Employees (Employee_ID, First_Name, Last_Name, Password_, Email_Address) VALUES (%s, %s, %s, %s, %s);"""
        cursor.execute(query, (
            data['id'], 
            data['first_name'], 
            data['last_name'], 
            data['password'], 
            data['email']
        ))
        
        conn.commit()
        conn.close()
        return add_cors_headers(jsonify({"message": "Employee inserted successfully"})), 201
    except Exception as e:
        app.logger.error(f"Error in new_employee: {e}")
        return add_cors_headers(jsonify({"error": str(e)})), 400

# [Other routes would follow the same pattern]



@app.route('/new_order', methods=['POST'])
def new_order():
    data = request.json
    try:
        conn = get_db_connection()
        if not conn:
            return add_cors_headers(jsonify({"error": "Database connection failed"})), 500

        cursor = conn.cursor()
        query = """INSERT INTO Flight_Orders (Customer_ID, Food_ID, Seat, Completed) VALUES (%s, %s, %s, %s);"""
        cursor.execute(query, (
            data['customer_id'], 
            data['food_id'], 
            data['seat'], 
            data['completed']
        ))
        
        conn.commit()
        conn.close()
        return add_cors_headers(jsonify({"message": "Order inserted successfully"})), 201
    except Exception as e:
        return add_cors_headers(jsonify({"error": str(e)})), 400
    

@app.route('/login_customer', methods=['POST'])
def login_customer():
    data = request.json
    try:
        conn = get_db_connection()
        if not conn:
            return add_cors_headers(jsonify({"error": "Database connection failed"})), 500

        cursor = conn.cursor()
        query = """SELECT * FROM Customers WHERE Email_Address = %s AND Password_ = %s;"""
        cursor.execute(query, (data['email'], data['password']))
        rows = cursor.fetchall()
        
        conn.close()
        if rows:
            return add_cors_headers(jsonify({"authenticated": True})), 200
        return add_cors_headers(jsonify({"authenticated": False})), 401
    except Exception as e:
        return add_cors_headers(jsonify({"error": str(e)})), 400

@app.route('/login_employee', methods=['POST'])
def login_employee():
    data = request.json
    try:
        conn = get_db_connection()
        if not conn:
            return add_cors_headers(jsonify({"error": "Database connection failed"})), 500

        cursor = conn.cursor()
        query = """SELECT * FROM Employees WHERE Email_Address = %s AND Password_ = %s;"""
        cursor.execute(query, (data['email'], data['password']))
        rows = cursor.fetchall()
        
        conn.close()
        if rows:
            return add_cors_headers(jsonify({"authenticated": True})), 200
        return add_cors_headers(jsonify({"authenticated": False})), 401
    except Exception as e:
        return add_cors_headers(jsonify({"error": str(e)})), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)