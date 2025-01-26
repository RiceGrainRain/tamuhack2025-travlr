import sys
sys.path.append("python")

from openai import OpenAI
import json
import os

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def get_chatgpt_response(user_input):
    messages = [
        {"role": "system", "content": "You are an intelligent assistant."},
        {"role": "user", "content": user_input}
    ]
    
    chat_completion = client.chat.completions.create(
        model="gpt-4o",
        messages=messages
    )
    
    return chat_completion.choices[0].message.content

def main():
    user_input = "what is 2*7"
    response = get_chatgpt_response(user_input)
    print(f"ChatGPT: {response}")

if __name__ == "__main__":
    main()