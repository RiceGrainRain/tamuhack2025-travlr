import sys
sys.path.append("python")

from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from openai import OpenAI
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {
    "origins": "*",
    "methods": ["GET", "POST", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization"]
}})

# Initialize OpenAI client
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

# Flight information storage
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

@app.route('/update_flight_info', methods=['OPTIONS'])
@app.route('/get_flight_info', methods=['OPTIONS'])
@app.route('/chat', methods=['OPTIONS'])
def handle_options():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    return response

def add_cors_headers(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

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
    app.run(debug=True)