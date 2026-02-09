from flask import Flask, render_template, request, jsonify
from flask_mysqldb import MySQL
from MySQLdb import IntegrityError
app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Andres2006'
app.config['MYSQL_DB'] = 'proyecto_pst'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app)
@app.route('/')
def index():
    return render_template('index.html')
@app.route('/api/productos', methods=['GET', 'POST'])
@app.route('/api/productos/<int:id>', methods=['PUT', 'DELETE'])
def api_productos(id=None):
    cursor = mysql.connection.cursor()
    try:
        if request.method == 'GET':
            cursor.execute("SELECT * FROM productos ORDER BY id DESC")
            return jsonify(cursor.fetchall())

        if request.method in ['POST', 'PUT']:
            data = request.json
            nombre = str(data.get('nombre', '')).strip()
            precio = float(data.get('precio', 0))
            stock = int(data.get('stock', 0))
            descripcion = data.get('descripcion', '')
            codigo = data.get('codigo', '')
            if nombre.isdigit() or precio < 0 or stock < 0:
                return jsonify({"status": "error", "message": "Datos inválidos detectados"}), 400
            if request.method == 'POST':
                try:
                    cursor.execute("""INSERT INTO productos (codigo_barras, nombre, precio, stock, descripcion) 
                                   VALUES (%s, %s, %s, %s, %s)""",
                                   (codigo, nombre, precio, stock, descripcion))
                    mysql.connection.commit()
                    return jsonify({"status": "success", "message": "Se ha Guardado en el Inventario"}), 201
                except IntegrityError as e:
                    if e.args[0] == 1062:
                        return jsonify({"status": "error", "message": "El código de barras ya existe"}), 400
                    return jsonify({"status": "error", "message": "Error de integridad en la base de datos"}), 400
            if request.method == 'PUT':
                cursor.execute("""UPDATE productos SET nombre=%s, precio=%s, stock=%s, descripcion=%s 
                               WHERE id=%s""",
                               (nombre, precio, stock, descripcion, id))
                mysql.connection.commit()
                return jsonify({"status": "success", "message": "Se ha Actualizado"})
        if request.method == 'DELETE':
            cursor.execute("DELETE FROM productos WHERE id=%s", (id,))
            mysql.connection.commit()
            return jsonify({"status": "success", "message": "Eliminado correctamente"})
    except Exception as e:
        print(f"ERROR EN EL SERVIDOR: {e}")
        return jsonify({"status": "error", "message": "Error interno del servidor"}), 500
    finally:
        cursor.close()
if __name__ == '__main__':
    app.run(debug=True)