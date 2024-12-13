import newrelic.agent
newrelic.agent.initialize('newrelic.ini')

from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/health', methods=['GET'])
def health():
    return jsonify(status='healthy')

@app.route('/items', methods=['POST'])
def create_item():
    data = request.get_json()
    return jsonify(name=data['name']), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
