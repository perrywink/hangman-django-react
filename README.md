# Steps to run the app on local dev.
## Backend
Prereqs: Make sure you have `python` and `pip` installed on your machine.
1. `cd backend`
2. (Optional to install pip dependencies in a virtual env) `python -m venv venv` and `source venv/bin/activate`
3. `pip install -r requirements.txt`
4. `cd hangman`
5. `python manage.py makemigrations` - If this is your first time, this shouldn't actually make any new migrations. But it will init the DB as `db.sqlite3`
6. `python manage.py migrate`
7. `python manage.py runserver` - Starts the server on `localhost:8000`

## Frontend
Prereqs: `bun` is the package manager I used but you can still use `npm` (Install [here](https://bun.sh/docs/installation))
1. `cd frontend`
2. `bun install` or `npm install`
3. `bun run dev`or `npm run dev` - Starts the vite server on `localhost:5173`