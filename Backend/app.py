from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error
from flask_cors import CORS
import pandas as pd

from Query_generator import get_query
from database_structure import (
    find_all_databases,
    find_all_tables,
    find_all_columns,
    find_all_the_columns_with_datatype
)

app = Flask(__name__)
CORS(app)

# Global connection and cursor
connection = None
cursor = None

@app.route('/',methods=['GET','POST'])
def home():
    return jsonify({"message":"It works!"})

@app.route('/connect', methods=['POST'])
def connect_to_database():
    """Handles initial database connection"""
    global connection, cursor
    data = request.json
    host = data.get('host')
    username = data.get('username')
    password = data.get('password')

    try:
        connection = mysql.connector.connect(
            host=host,
            user=username,
            password=password
        )
        cursor = connection.cursor()
        return jsonify({"message": "Connected"}), 200
    except Error as e:
        return jsonify({"error": str(e)}), 400

@app.route('/get-databases', methods=['GET'])
def get_databases():
    """Fetch available databases (excluding system databases)"""
    global cursor
    if not cursor:
        return jsonify({"error": "No active database connection"}), 400

    try:
        databases = find_all_databases(cursor)
        return jsonify({"databases": databases}), 200
    except Error as e:
        return jsonify({"error": str(e)}), 400

@app.route('/get-tables', methods=['POST'])
def get_tables():
    """Set the selected database and retrieve table names & attributes"""
    global cursor
    data = request.json
    selected_db = data.get('database')

    if not cursor:
        return jsonify({"error": "No active database connection"}), 400

    try:
        tables = find_all_tables(selected_db, cursor)
        table_details = {table: find_all_columns(selected_db, table, cursor) for table in tables}
        return jsonify({"tables": table_details}), 200
    except Error as e:
        return jsonify({"error": str(e)}), 400

@app.route('/generate_query', methods=['POST'])
def generate_query():
    """Convert NL query to SQL and execute"""
    global cursor
    data = request.json
    nl_query = data.get('query')
    selected_db = data.get('database')

    if not nl_query or not selected_db:
        return jsonify({"error": "Query and context must be provided"}), 400
    try:
        sql_query = get_query(nl_query, cursor, selected_db)
        
        return jsonify({"sql_query_nlp": sql_query}), 200
    except Error as e:
        return jsonify({"error": str(e)}), 400


@app.route('/execute_query', methods=['POST'])
def execute_query():
    """Convert NL query to SQL using the fine-tuned T5 model"""
    data = request.json
    sql_query = data.get('query')
    selected_db = data.get('database')
    exec_only = data.get('exec_only')
    global cursor

    if not sql_query or not selected_db or not cursor:
        print('something is missing')
        return jsonify({"error": "Invalid input or no active connection"}), 400

    try:
        cursor.execute(sql_query)
        if exec_only:
            return jsonify({'message':'successful'}),200
        results = cursor.fetchall()
        column_names = [desc[0] for desc in cursor.description]
        df = pd.DataFrame(results)
        df.columns = column_names
        json_results = df.to_dict(orient="records")
        print(json_results)
        return jsonify({"results": json_results}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/get-table-schema', methods=['POST'])
def get_table_schema():
    """Fetch detailed schema (column names and types) for a specific table"""
    global cursor
    data = request.json
    selected_db = data.get('database')
    table_name = data.get('table')

    if not cursor or not selected_db or not table_name:
        return jsonify({"error": "Invalid input or no active connection"}), 400

    try:
        schema_details = find_all_the_columns_with_datatype(selected_db,table_name,cursor)
        return jsonify({"schema": schema_details}), 200
    except Error as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001)

