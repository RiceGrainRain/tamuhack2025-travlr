import sys
sys.path.append('lib')

from flask import Flask, request, jsonify, make_response
import psycopg2
from flask_cors import CORS
from openai import OpenAI
import os
from dotenv import load_dotenv
import logging
import random

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {
    "origins": "*",
    "methods": ["GET", "POST", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization"]
}})

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

flight_info = {
    "Dest": "",
    "Depart": "",
    "Depart_Time": "",
    "Dest_Time": "",
    "Current_Time": "",
    "Flight_ID": "",
    "Dest_Gate": "",
    "Depart_Gate": ""
}

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
@app.route('/flight/<flight_id>', methods=['OPTIONS'])
@app.route('/gets_flight/<email>', methods=['OPTIONS'])
@app.route('/update_flight_info', methods=['OPTIONS'])
@app.route('/new_request', methods=['OPTIONS'])
@app.route('/get_request', methods=['OPTIONS'])
@app.route('/chat', methods=['OPTIONS'])
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
        
        fh = f"flights_{data['id']}"
        queryfh = f"""CREATE TABLE "{fh}" (
            Date_ VARCHAR(8) NOT NULL, 
            Flight_ID INTEGER NOT NULL, 
            Depart VARCHAR(3) NOT NULL, 
            Dest VARCHAR(3) NOT NULL, 
            PRIMARY KEY (Flight_ID)
        );"""
        cursor.execute(queryfh)
        
        oh = f"orders_{data['id']}"
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
    
@app.route('/new_review', methods=['POST'])
def new_review():
    data = request.json
    try:
        conn = get_db_connection()
        if not conn:
            return add_cors_headers(jsonify({"error": "Database connection failed"})), 500

        cursor = conn.cursor()
        query = """INSERT INTO Reviews (Date_, Flight_ID, Customer_ID, Rating, Review) VALUES (%s, %s, %s, %s, %s);"""
        cursor.execute(query, (
            data['date'], 
            data['flight_id'], 
            data['customer_id'], 
            data['rating'], 
            data['review']
        ))
        
        conn.commit()
        conn.close()
        return add_cors_headers(jsonify({"message": "Review inserted successfully"})), 201
    except Exception as e:
        return add_cors_headers(jsonify({"error": str(e)})), 400
    
@app.route('/new_flight', methods=['POST'])
def new_flight():
    data = request.json
    try:
        conn = get_db_connection()
        if not conn:
            return add_cors_headers(jsonify({"error": "Database connection failed"})), 500

        cursor = conn.cursor()
        query = """INSERT INTO flights_""" + f"{data['customer_id']}" + """ (Date_, Flight_ID, Depart, Dest) VALUES (%s, %s, %s, %s);"""
        cursor.execute(query, ( 
            data['date'],
            data['flight_id'],
            data['depart'], 
            data['dest']
        ))

        query2 = """UPDATE Customers SET Flight_ID = %s WHERE Customer_ID = %s;"""
        cursor.execute(query2, (data['flight_id'], data['customer_id']))

        seat = f"{random.choice(['A', 'B', 'C', 'D'])}{random.randint(1, 33)}"

        query3 = """UPDATE Customers SET Seat = %s WHERE Customer_ID = %s;"""
        cursor.execute(query3, (seat, data['customer_id']))
        
        conn.commit()
        conn.close()
        return add_cors_headers(jsonify({"message": "Flight inserted successfully"})), 201
    except Exception as e:
        return add_cors_headers(jsonify({"error": str(e)})), 400
    
@app.route('/new_order_done', methods=['POST'])
def new_order_done():
    data = request.json
    try:
        conn = get_db_connection()
        if not conn:
            return add_cors_headers(jsonify({"error": "Database connection failed"})), 500

        cursor = conn.cursor()
        query = """INSERT INTO orders_""" + f"{data['customer_id']}" + """ (Date_, Food_Name, Price) VALUES (%s, %s, %s);"""
        cursor.execute(query, (
            data['date'],
            data['food_name'],
            data['price']
        ))
        
        conn.commit()
        conn.close()
        return add_cors_headers(jsonify({"message": "Flight inserted successfully"})), 201
    except Exception as e:
        return add_cors_headers(jsonify({"error": str(e)})), 400
    

@app.route('/new_request', methods=['POST'])
def new_request():
    data = request.json
    try:
        conn = get_db_connection()
        if not conn:
            return add_cors_headers(jsonify({"error": "Database connection failed"})), 500

        cursor = conn.cursor()
        query = """INSERT INTO Requests (Seat, Request) SELECT Seat, %s FROM Customers WHERE Customer_ID = %s;"""
        cursor.execute(query, (
            data['request'],
            data['customer_id'],
            
        ))
        
        conn.commit()
        conn.close()
        return add_cors_headers(jsonify({"message": "Request inserted successfully"})), 201
    except Exception as e:
        return add_cors_headers(jsonify({"error": str(e)})), 400
    
@app.route('/get_requests', methods=['GET'])
def get_requests():
    try:
        conn = get_db_connection()
        if not conn:
            return add_cors_headers(jsonify({"error": "Database connection failed"})), 500

        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Requests;")
        rows = cursor.fetchall()
        requests = []
        for row in rows:
            requests.append({
                'Request_ID': row[0],
                'Seat': row[1],
                'Request': row[2]
            })
        
        conn.commit()
        conn.close()
        return add_cors_headers(jsonify(requests)), 200
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


# Function to get the flight details
def get_flight_by_id(flight_id):
    try:
        # Establish a connection to the PostgreSQL database
        conn = get_db_connection()
        if not conn:
            return add_cors_headers(jsonify({"error": "Database connection failed"})), 500
        
        cursor = conn.cursor()

        # Define the query to retrieve the flight details based on Flight_ID
        query = """SELECT * FROM Flights WHERE Flight_ID = %s"""

        # Execute the query
        cursor.execute(query, (flight_id,))
        
        # Fetch the result
        flight = cursor.fetchone()

        # Close the cursor and connection
        cursor.close()
        conn.close()

        # If flight is found, return it, otherwise return None
        if flight:
            return {
                "Flight_ID": flight[0],
                "Depart": flight[1],
                "Dest": flight[2],
                "Depart_Time": flight[3],
                "Dest_Time": flight[4],
                "Depart_Gate": flight[5],
                "Dest_Gate": flight[6]
            }
        else:
            return None

    except Exception as e:
        print(f"Error: {e}")
        return None
    
# Function to get the flight details
def get_flight_by_email(email):
    try:
        # Establish a connection to the PostgreSQL database
        conn = get_db_connection()
        if not conn:
            return add_cors_headers(jsonify({"error": "Database connection failed"})), 500
        
        cursor = conn.cursor()

        # Define the query to retrieve the flight details based on Flight_ID
        query = """SELECT Flight_ID FROM Customers WHERE Email_Address = %s"""

        # Execute the query
        cursor.execute(query, (email,))
        
        # Fetch the result
        flight = cursor.fetchone()

        # Close the cursor and connection
        cursor.close()
        conn.close()

        # If flight is found, return it, otherwise return None
        if flight:
            return {"flight": flight[0]}
        else:
            return None

    except Exception as e:
        print(f"Error: {e}")
        return None

# API route to get flight details by Flight_ID
@app.route('/flight/<flight_id>', methods=['GET'])
def get_flight(flight_id):
    flight = get_flight_by_id(flight_id)

    if flight:
        return add_cors_headers(jsonify(flight)), 200
    else:
        return add_cors_headers(jsonify({"error": "Flight not found"})), 404
    
@app.route('/gets_flight/<email>', methods=['GET'])
def gets_flight(email):
    flight = get_flight_by_email(email)

    if flight:
        return add_cors_headers(jsonify(flight)), 200
    else:
        return add_cors_headers(jsonify({"error": "Flight not found"})), 404



@app.route('/update_flight_info', methods=['POST'])
def update_flight_info():
    global flight_info
    new_info = request.json
    
    # Update only the fields that are provided
    for key, value in new_info.items():
        if key in flight_info:
            flight_info[key] = value
    
    return add_cors_headers(jsonify({
        "message": "Flight information updated successfully",
        "flight_info": flight_info
    })), 200

@app.route('/get_flight_info', methods=['GET'])
def get_flight_info():
    return add_cors_headers(jsonify(flight_info)), 200

@app.route('/chat', methods=['POST'])
def get_chatgpt_response():
    # Prepare system message with flight context
    system_message = (
        "You are an intelligent flight assistant. "
        "Respond to user queries about their flight with the following context:\n"
        f"Destination Airport: {flight_info['Dest']}\n"
        f"Departure Airport: {flight_info['Depart']}\n"
        f"Departure Time: {flight_info['Depart_Time']}\n"
        f"Destination Time: {flight_info['Dest_Time']}\n"
        f"Current Time: {flight_info['Current_Time']}\n" #-
        f"Flight ID: {flight_info['Flight_ID']}\n"
        f"Destination Gate: {flight_info['Dest_Gate']}\n"
        f"Departure Gate: {flight_info['Depart_Gate']}\n"
    )

    # Get user input from request
    user_input = request.json.get('message', '')
    
    # Prepare messages for OpenAI
    messages = [
        {"role": "system", "content": system_message},
        {"role": "user", "content": user_input}
    ]
    
    try:
        # Generate chat completion
        chat_completion = client.chat.completions.create(
            model="gpt-4o",
            messages=messages
        )
        
        # Return the response
        return add_cors_headers(jsonify({
            "response": chat_completion.choices[0].message.content
        })), 200
    
    except Exception as e:
        return add_cors_headers(jsonify({
            "error": str(e)
        })), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)