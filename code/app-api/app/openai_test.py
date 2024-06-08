from flask import Flask, request, jsonify
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize the OpenAI client with the API key
client = OpenAI(
  api_key=os.environ.get("OPENAI_API_KEY")
)

app = Flask(__name__)


def get_response_from_openai(prompt):
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a translator"},
            {"role": "user", "content": prompt}
        ]
    )
    return completion.choices[0].message.content

@app.route('/get-response', methods=['POST'])
def get_response():
    data = request.json
    prompt = data.get('prompt')
    if not prompt:
        return jsonify({'error': 'No prompt provided'}), 400
    
    response = get_response_from_openai(prompt)
    return jsonify({'response': response})

if __name__ == "__main__":
    app.run(debug=True)