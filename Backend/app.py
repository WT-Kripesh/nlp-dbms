from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all routes and origins
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/connect', methods=['POST'])
def connect_to_database():
    # Get data from request
    print('reached backend!')
    data = request.json
    host = data.get('host')
    username = data.get('username')
    password = data.get('password')

    # Attempt to connect to MySQL
    try:
        connection = mysql.connector.connect(
            host=host,
            user=username,
            password=password
        )
        cursor = connection.cursor()
        system_databases = ['information_schema', 'mysql', 'performance_schema', 'sys']

        cursor.execute("SHOW DATABASES")
        databases = cursor.fetchall()
        list_of_databases = [db[0] for db in databases if db[0] not in system_databases]
        print(list_of_databases)
        
        if connection.is_connected():
            return jsonify({"message": "Connection successful!",'databases':list_of_databases}), 200
    except Error as e:
        return jsonify({"error": str(e)}), 400
    finally:
        if 'connection' in locals() and connection.is_connected():
            connection.close()

# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001)
