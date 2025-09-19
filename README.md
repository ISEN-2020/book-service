# Book Service API

Service web Flask pour gérer une collection de livres, avec persistance SQLite, rendu HTML simple et API REST. Le projet inclut CORS (allow‑list), protection CSRF et gestion de `SECRET_KEY` via variables d'environnement. Un `Dockerfile` est fourni pour une exécution en production via Gunicorn avec un utilisateur non‑root. Un workflow GitHub Actions est disponible pour construire et pousser l'image Docker, générer un SBOM, lancer une analyse Sonar et scanner les vulnérabilités avec Trivy.

---

## Sommaire
- **[Fonctionnalités](#fonctionnalités)**
- **[Structure du projet](#structure-du-projet)**
- **[Prérequis](#prérequis)**
- **[Installation & démarrage en local](#installation--démarrage-en-local)**
- **[Variables d'environnement](#variables-denvironnement)**
- **[Exécution avec Docker](#exécution-avec-docker)**
- **[API](#api)**
- **[Exemples curl](#exemples-curl)**
- **[Sécurité et bonnes pratiques](#sécurité-et-bonnes-pratiques)**
- **[Intégration Continue (CI)](#intégration-continue-ci)**
- **[Dépannage](#dépannage)**

---

## Fonctionnalités
- **Liste des livres** depuis `livres.json` si présent, sinon depuis la base **SQLite** `library.db`.
- **CRUD** basique via endpoints REST: `GET`, `POST`, `PUT`, `DELETE`.
- **Pages HTML** minimalistes pour `/`, `/books`, `/docs`.
- **Endpoint de santé**: `/health`.
- **Sécurité**: CSRF (Flask‑WTF), CORS avec allow‑list, secret Flask injecté via variables d'environnement.

---

## Structure du projet
- `main.py` — Application Flask, routes et logique (SQLite, gestion JSON, CORS/CSRF, env vars).
- `requirements.txt` — Dépendances Python (Flask, Gunicorn, CORS, Flask‑WTF).
- `Dockerfile` — Image Python 3.13, installation deps, lancement via Gunicorn en utilisateur non‑root.
- `livres.json` — Données d'exemple optionnelles (prioritaires sur la DB pour l'affichage `/books`).
- `library.db` — Base SQLite (créée et maintenue automatiquement).
- `.github/workflows/build.yml` — Workflow CI pour build/push image Docker, SBOM, Sonar, Trivy.
- `sonar-project.properties` — Clés SonarCloud du projet.

---

## Prérequis
- Python 3.11+ recommandé (l'image Docker utilise 3.13).
- Pip/venv ou Docker installé.

---

## Installation & démarrage en local
1. Créer un environnement virtuel (recommandé) et installer les dépendances:

```bash
pip install -r requirements.txt
```

2. (Optionnel) Définir une clé de développement stable:

- PowerShell (Windows):
```powershell
$env:DEV_SECRET_KEY = "<valeur-aleatoire-longue>"
```

- Bash (Linux/macOS):
```bash
export DEV_SECRET_KEY="<valeur-aleatoire-longue>"
```

3. Lancer l'application:

- PowerShell (Windows):
```powershell
python .\main.py
```

- Bash (Linux/macOS):
```bash
python ./main.py
```

Par défaut, l'application écoute sur `http://127.0.0.1:5000`.

---

## Variables d'environnement
- `SECRET_KEY` (prod, requis) — Clé secrète Flask. Si absente en production, l'app lève une erreur au démarrage.
- `DEV_SECRET_KEY` (dev, optionnel) — Clé utilisée uniquement si `SECRET_KEY` est absente; évite d'avoir une clé codée en dur.
- `FLASK_ENV` — `production` ou `development` (par défaut `development`). En `production`, `SECRET_KEY` est exigée.
- `FLASK_DEBUG` — `1/true` pour activer le debug (à éviter en prod). Par défaut, activé seulement hors prod.
- `ALLOWED_ORIGINS` — Liste de domaines autorisés pour CORS, séparés par virgules. Défaut: `http://localhost:3000,http://127.0.0.1:3000`.

Exemples:
```bash
# Production-like
export SECRET_KEY="<strong-secret>"
export FLASK_ENV=production
export ALLOWED_ORIGINS="https://mon-site.fr,https://app.example.com"
```

---

## Exécution avec Docker

### Construire l'image localement
```bash
docker build -t book-service:local .
```

### Lancer le conteneur
```bash
docker run \
  -e SECRET_KEY="<strong-secret>" \
  -e FLASK_ENV=production \
  -e ALLOWED_ORIGINS="http://localhost:3000" \
  -p 5000:5000 \
  book-service:local
```

### Exemple Docker Compose
```yaml
services:
  book-service:
    image: docker.io/<user>/book-service:latest
    environment:
      FLASK_ENV: production
      SECRET_KEY: ${SECRET_KEY}
      ALLOWED_ORIGINS: ${ALLOWED_ORIGINS:-http://localhost:3000}
    ports:
      - "5000:5000"
```

---

## API
- `GET /` — Page d'accueil HTML avec liens utiles.
- `GET /health` — Statut `{status: "ok"}` ou code 503 si dégradé.
- `GET /books` (alias: `/getBooks`) — Liste les livres. Si `livres.json` existe, il est utilisé; sinon fallback sur SQLite.
- `POST /books` (alias: `/addBook`, `/addBooks`) — Ajoute un livre. Body JSON requis.
- `PUT /books/<id>` (alias: `/updateBook/<id>`) — Met à jour un livre par ID. Body JSON requis.
- `DELETE /books/<id>` (alias: `/deleteBook/<id>`) — Supprime un livre par ID.
- `GET /docs` — Page HTML d'aide intégrée.

Schéma JSON pour POST/PUT:
```json
{
  "title": "string",
  "author": "string",
  "description": "string (optionnel)",
  "year": 2024,
  "quantity": 10
}
```

Règles de validation: `title`, `author`, `year`, `quantity` sont requis; en cas d'absence → 400.

---

## Exemples curl
- GET livres:
```bash
curl -i http://127.0.0.1:5000/books
```

- POST livre:
```bash
curl -i -X POST http://127.0.0.1:5000/books \
  -H "Content-Type: application/json" \
  -d '{
        "title":"Nouveau Livre",
        "author":"Auteur",
        "description":"Optionnel",
        "year":2024,
        "quantity":5
      }'
```

- PUT livre:
```bash
curl -i -X PUT http://127.0.0.1:5000/books/1 \
  -H "Content-Type: application/json" \
  -d '{
        "title":"Titre MAJ",
        "author":"Auteur MAJ",
        "description":"Desc MAJ",
        "year":2023,
        "quantity":7
      }'
```

- DELETE livre:
```bash
curl -i -X DELETE http://127.0.0.1:5000/books/1
```

---

## Sécurité et bonnes pratiques
- **CSRF**: `Flask-WTF`/`CSRFProtect` est initialisé dans `main.py`. Les vues API JSON sont protégées côté serveur.
- **CORS**: `flask-cors` avec allow‑list. Configurez `ALLOWED_ORIGINS` pour vos domaines front.
- **Secret Key**: pas de valeur codée en dur. En prod, `SECRET_KEY` est obligatoire. En dev, si absent, une clé éphémère est générée (warning en console) ou définissez `DEV_SECRET_KEY`.
- **Non‑root en conteneur**: l'image exécute Gunicorn sous un utilisateur dédié `appuser`.
- **Debug**: le debug Flask n'est jamais activé par défaut en prod. Respect de `FLASK_DEBUG` uniquement si explicitement défini.

---

## Intégration Continue (CI)
Workflow: `.github/workflows/build.yml`

- **Déclencheur**: `push` sur la branche `master`.
- **Étapes principales**:
  - Checkout du code (`actions/checkout@v4`).
  - Build & push de l'image Docker (`docker/build-push-action@v5`) vers Docker Hub avec tag `docker.io/${{ secrets.DOCKER_USERNAME }}/book-service:${{ github.sha }}`.
  - **SBOM**: génération via `anchore/sbom-action@v0` (format SPDX JSON).
  - **Sonar**: scan avec `SonarSource/sonarqube-scan-action@v5` (nécessite `SONAR_TOKEN`).
  - **Sécurité**: scan de vulnérabilités image avec `aquasecurity/trivy-action` (HIGH/CRITICAL rapportés).

Secrets requis côté repo:
- `DOCKER_USERNAME`, `DOCKER_PASSWORD`
- `SONAR_TOKEN`

Configuration Sonar (`sonar-project.properties`):
- `sonar.projectKey=ISEN-2020_book-service`
- `sonar.organization=isen-2020`

---

## Dépannage
- **`SECRET_KEY must be set in production`**: définissez `SECRET_KEY` et `FLASK_ENV=production` correctement (ou utilisez `DEV_SECRET_KEY` en dev).
- **CORS bloqué**: ajoutez votre origine à `ALLOWED_ORIGINS` (ex: `http://localhost:3000`).
- **Base SQLite vide**: la table est créée automatiquement au démarrage. Ajoutez des livres via `POST /books` ou placez un `livres.json` valide pour lister.
- **Port déjà utilisé**: changez le mapping `-p 5000:5000` côté Docker ou libérez le port local.
- **Échec CI Docker push**: vérifiez `DOCKER_USERNAME/DOCKER_PASSWORD` et vos droits sur Docker Hub.
- **Échec Sonar**: vérifiez `SONAR_TOKEN` et les clés `projectKey/organization`.

---

## Licence
Indiquez ici la licence du projet (par ex. MIT). Si non précisé, ajoutez un fichier `LICENSE`.
