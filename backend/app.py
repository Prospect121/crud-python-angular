from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from dotenv import load_dotenv
from flask_cors import CORS

import os
import MySQLdb.cursors

load_dotenv()

db_user = os.getenv('DB_USER')
db_password = os.getenv('DB_PASSWORD')
db_host = os.getenv('DB_HOST')
db_port = int(os.getenv('DB_PORT'))
db_name = os.getenv('DB_NAME')

app = Flask(__name__)
CORS(app, origins=["http://localhost:4200"])


# Required
app.config['MYSQL_HOST'] = db_host
app.config["MYSQL_PORT"] = db_port
app.config["MYSQL_USER"] = db_user
app.config["MYSQL_PASSWORD"] = db_password
app.config["MYSQL_DB"] = db_name

mysql = MySQL(app)

# Create the database table if it does not exist
@app.before_request
def create_tables():
    cursor = mysql.connection.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id INT AUTO_INCREMENT PRIMARY KEY,
            task VARCHAR(255),
            status BOOLEAN
        )
    """)
    mysql.connection.commit()
    cursor.close()

# Ruta para obtener usuarios
@app.route('/users', methods=['GET'])
def get_users():
    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT * FROM users")
        users = cursor.fetchall()
        cursor.close()
        return jsonify(users), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Ruta para crear un usuario
@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    
    if not name or not email:
        return jsonify({"error": "Name and email are required"}), 400
    
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("INSERT INTO users (name, email) VALUES (%s, %s)", (name, email))
        mysql.connection.commit()
        cursor.close()
        return jsonify({"message": "User created"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Ruta para actualizar un usuario
@app.route('/users', methods=['PUT'])
def update_user():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    user_id = data.get('id')
    cursor = mysql.connection.cursor()
    cursor.execute("UPDATE users SET name = %s, email = %s WHERE id = %s", (name, email, user_id))
    mysql.connection.commit()
    cursor.close()
    return jsonify({"message": "User updated"}), 200

# Ruta para remover un usuario
@app.route('/users/<int:id>', methods=['DELETE'])
def remove_user(id):
    cursor = mysql.connection.cursor()
    cursor.execute("DELETE FROM users WHERE id = %s", (id,))
    mysql.connection.commit()
    cursor.close()
    return jsonify({"message": "User removed"}), 200


if __name__ == '__main__':
 app.run(debug=True)