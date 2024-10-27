FROM python:3.10.15-bullseye
WORKDIR /backend

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy in entire working directory
COPY . .
WORKDIR /backend/hangman

# Migrations for sqlite db
RUN python manage.py makemigrations
RUN python manage.py migrate

# Ensure frontend can talk to it.
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
