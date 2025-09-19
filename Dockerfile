# Utiliser une image Python
FROM python:3.13
 
# Définir le répertoire de travail dans le conteneur
WORKDIR /app
 
# Copier le fichier requirements.txt (que nous allons créer) et installer les dépendances
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
 
# Copier uniquement les fichiers nécessaires à l'exécution
COPY main.py ./

# Créer un utilisateur non privilégié et attribuer les permissions
RUN groupadd -r appuser && useradd -r -g appuser appuser \
    && chown -R appuser:appuser /app

# Exposer le port 5000 (le port par défaut utilisé par Uvicorn)
EXPOSE 5000
 
# Démarrer l'application Flask avec Gunicorn
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Exécuter en tant qu'utilisateur non-root
USER appuser

CMD ["gunicorn", "-w", "2", "-b", "0.0.0.0:5000", "main:app"]
