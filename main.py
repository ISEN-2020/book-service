from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from flask_wtf import CSRFProtect
import sqlite3
import os
import secrets

app = Flask(__name__)
# CSRF protection (SonarQube compliant). SECRET_KEY must come from env.
# No hard-coded default; for development, an ephemeral key is generated if missing.
# Determine environment and enforce SECRET_KEY in production
_env = (os.getenv('FLASK_ENV') or os.getenv('ENV') or os.getenv('ENVIRONMENT') or 'development').lower()
_secret = os.getenv('SECRET_KEY')
if not _secret:
    if _env in ('prod', 'production'):
        raise RuntimeError("SECRET_KEY environment variable must be set in production.")
    # Optional dev override; avoids hard-coding in source control
    _secret = os.getenv('DEV_SECRET_KEY') or secrets.token_urlsafe(32)
    print("WARNING: SECRET_KEY not set; using ephemeral key (development only).")
app.config['SECRET_KEY'] = _secret
csrf = CSRFProtect()
csrf.init_app(app)
# Configure CORS with an allow-list (no wildcard) to satisfy security best practices
_origins_env = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")
ALLOWED_ORIGINS = [o.strip() for o in _origins_env.split(",") if o.strip()]
CORS(app, resources={r"/*": {"origins": ALLOWED_ORIGINS}})

# Connexion à la base de données SQLite
DATABASE = "library.db"

# Messages d'erreur/constants
ERROR_DB_CONN_MSG = "Impossible de se connecter à la base de données"

def get_db_connection():
    try:
        conn = sqlite3.connect(DATABASE)
        conn.row_factory = sqlite3.Row  # Pour avoir les résultats sous forme de dictionnaire
        return conn
    except sqlite3.Error as e:
        print(f"Erreur lors de la connexion à la base de données: {e}")
        return None

# Créer la table "books" dans SQLite si elle n'existe pas
def create_table():
    conn = get_db_connection()
    if conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS books (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                author TEXT NOT NULL,
                description TEXT,
                year INTEGER NOT NULL,
                quantity INTEGER NOT NULL
            )
        ''')
        conn.commit()
        conn.close()
        
        
        
# Endpoint pour la page d'accueil
@app.route('/', methods=['GET'])
def home():
    return '''
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Accueil de l'API</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
                padding: 20px;
                background-color: #f4f4f4;
                color: #333;
            }
            h1 {
                color: #0056b3;
            }
            p {
                font-size: 1.2em;
            }
            ul {
                line-height: 1.6;
                list-style-type: none;
                padding: 0;
            }
            li {
                margin: 10px 0;
            }
            a {
                color: #007bff;
                text-decoration: none;
                font-size: 1.1em;
            }
            a:hover {
                text-decoration: underline;
            }
            .container {
                max-width: 800px;
                margin: auto;
                background: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Bienvenue sur l'API de Gestion de Livres</h1>
            <p>Voici les différentes URL disponibles pour interagir avec l'API :</p>
            <ul>
                <li><a href="/books">Voir tous les livres</a></li>
                <li><a href="/docs">Documentation de l'API</a></li>
            </ul>
        </div>
    </body>
    </html>
    '''

# Healthcheck endpoint
@app.route('/health', methods=['GET'])
def health():
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"status": "degraded", "db": "unavailable"}), 503
        conn.execute('SELECT 1')
        conn.close()
        return jsonify({"status": "ok"})
    except Exception as e:
        return jsonify({"status": "degraded", "error": str(e)}), 503


# Endpoint pour obtenir la liste de tous les livres (GET)
@app.route('/books', methods=['GET'])
def get_books():
    conn = get_db_connection()
    if conn:
        books = conn.execute('SELECT * FROM books').fetchall()
        conn.close()

        # Construction de la réponse HTML
        books_html = '<!DOCTYPE html>'
        books_html += '<html lang="fr">'
        books_html += '<head>'
        books_html += '<meta charset="UTF-8">'
        books_html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
        books_html += '<title>Liste des Livres</title>'
        books_html += '<style>'
        books_html += 'body { font-family: Arial, sans-serif; margin: 20px; padding: 20px; background-color: #f4f4f4; color: #333; }'
        books_html += 'table { width: 100%; border-collapse: collapse; }'
        books_html += 'th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }'
        books_html += 'th { background-color: #0056b3; color: white; }'
        books_html += 'tr:hover { background-color: #f5f5f5; }'
        books_html += 'h1 { color: #0056b3; }'
        books_html += '</style>'
        books_html += '</head>'
        books_html += '<body>'
        books_html += '<h1>Liste des Livres</h1>'
        books_html += '<table>'
        books_html += '<tr><th>ID</th><th>Title</th><th>Author</th><th>Description</th><th>Year</th><th>Quantity</th></tr>'
        
        for book in books:
            books_html += '<tr>'
            books_html += f'<td>{book["id"]}</td>'
            books_html += f'<td>{book["title"]}</td>'
            books_html += f'<td>{book["author"]}</td>'
            books_html += f'<td>{book["description"] if book["description"] else "No description available"}</td>'
            books_html += f'<td>{book["year"]}</td>'
            books_html += f'<td>{book["quantity"] if book["quantity"] is not None else "Not specified"}</td>'
            books_html += '</tr>'
        
        books_html += '</table>'
        books_html += '</body>'
        books_html += '</html>'

        return books_html
    else:
        return f'''
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Erreur</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; padding: 20px; background-color: #f4f4f4; color: #333; }
                h1 { color: #d9534f; }
            </style>
        </head>
        <body>
            <h1>Erreur</h1>
            <p>{ERROR_DB_CONN_MSG}.</p>
        </body>
        </html>
        ''', 500

# Endpoint pour ajouter un nouveau livre (POST)
@app.route('/books', methods=['POST'])
def add_book():
    new_book = request.get_json()

    title = new_book.get('title')
    author = new_book.get('author')
    description = new_book.get('description')
    year = new_book.get('year')
    quantity = new_book.get('quantity')

    if not (title and author and year and quantity):
        abort(400, description="Données manquantes pour ajouter un livre")

    conn = get_db_connection()
    if conn:
        conn.execute('''
            INSERT INTO books (title, author, description, year, quantity)
            VALUES (?, ?, ?, ?, ?)
        ''', (title, author, description, year, quantity))
        conn.commit()
        conn.close()
        return jsonify({"message": "Livre ajouté avec succès"}), 201
    else:
        return jsonify({"error": ERROR_DB_CONN_MSG}), 500

# Endpoint pour modifier un livre (PUT)
@app.route('/books/<int:id>', methods=['PUT'])
def update_book(id):
    updated_book = request.get_json()

    title = updated_book.get('title')
    author = updated_book.get('author')
    description = updated_book.get('description')
    year = updated_book.get('year')
    quantity = updated_book.get('quantity')

    if not (title and author and year and quantity):
        abort(400, description="Données manquantes pour modifier un livre")

    conn = get_db_connection()
    if conn:
        conn.execute('''
            UPDATE books SET title = ?, author = ?, description = ?, year = ?, quantity = ?
            WHERE id = ?
        ''', (title, author, description, year, quantity, id))
        conn.commit()
        conn.close()
        return jsonify({"message": "Livre mis à jour avec succès"})
    else:
        return jsonify({"error": ERROR_DB_CONN_MSG}), 500

# Endpoint pour supprimer un livre (DELETE)
@app.route('/books/<int:id>', methods=['DELETE'])
def delete_book(id):
    conn = get_db_connection()
    if conn:
        conn.execute('DELETE FROM books WHERE id = ?', (id,))
        conn.commit()
        conn.close()
        return jsonify({"message": "Livre supprimé avec succès"})
    else:
        return jsonify({"error": ERROR_DB_CONN_MSG}), 500

# Endpoint pour la documentation
@app.route('/docs', methods=['GET'])
def docs():
    return '''
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Documentation de l'API</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
                padding: 20px;
                background-color: #f4f4f4;
                color: #333;
            }
            h1 {
                color: #0056b3;
            }
            p {
                font-size: 1.2em;
            }
            ul {
                line-height: 1.6;
            }
            a {
                color: #007bff;
                text-decoration: none;
            }
            a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <h1>Bienvenue dans la base de données des livres</h1>
        <p>Voici comment utiliser l'API pour gérer les livres :</p>
        <ul>
            <li><strong>GET :</strong> <a href="http://127.0.0.1:5000/books">http://127.0.0.1:5000/books</a> - Voir tous les livres</li>
            <li><strong>POST :</strong> <a href="http://127.0.0.1:5000/books">http://127.0.0.1:5000/books</a> - Ajouter un livre (avec un body JSON)</li>
            <li><strong>PUT :</strong> <a href="http://127.0.0.1:5000/books/1">http://127.0.0.1:5000/books/1</a> - Modifier le livre avec ID 1 (avec un body JSON)</li>
            <li><strong>DELETE :</strong> <a href="http://127.0.0.1:5000/books/1">http://127.0.0.1:5000/books/1</a> - Supprimer le livre avec ID 1</li>
        </ul>
    </body>
    </html>
    '''


    
# Créer la table au chargement du module (utile quand lancé via Gunicorn)
create_table()

# Démarrer l'application Flask en mode développement uniquement si exécuté directement
if __name__ == '__main__':
    app.run(debug=True)
