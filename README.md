# Authentication Tool
Built in Django

## Installation
  **Frontend**
- Install node 16.20
- Navigate to /frontend directory
- To install package use following command
-     npm install
- To run dev server:
-     npm start
- For production and django templates:
-     npm run build
  **Backend**
- Install python 3.11 and use same for creating virtual env
- Install Postgres by using following command:
-     brew install postgresql@16
- Follow below commands to configure postgres
    - `sudo -u postgres psql`
    - `CREATE USER authtool WITH PASSWORD 'your-passwrd';`
    - `CREATE DATABASE authtool;`
    - `ALTER ROLE authtool SET client_encoding TO 'utf8';`
    - `ALTER ROLE authtool SET default_transaction_isolation TO 'read committed';`
    - `ALTER ROLE authtool SET timezone TO 'UTC';`
    - `GRANT ALL PRIVILEGES ON DATABASE authtool TO authtool;`
- Clone repo
- Create and activate virtualenv using your favorite venv manager (pipenv, `python -m venv`, conda, etc)
- `pip install -r requirements.txt`
- Copy `.env.template.yaml` to `env.yaml` and generate a new `SECRET_KEY` (https://djecrety.ir/) and also add above postgress credentials into this file.
-To run migrations
  - `manage.py migrate`
- To run server 
  - `manage.py runserver`
- To Create Superuser
  - `manage.py createsuperuser`
- To run celery worker use following command
  - python -m celery -A authentication worker --loglevel=info
## **Note**:
      In local environment detfault admin and user will create with following credentials:
          Admin: admin@example.com, password
          User: user@example.com, password

## Django Admin
Equivalent of existing TAT "Active Admin" (http://host/admin). Should be reimplemented to retain all standard CRUD operations for administrative use. 

## API
Django REST Framework (DRF) is part of this app for API.

## Celery / async tasks
TAT has asynchronous functionality such as progress bars that reflect the status of a CSV import. This app will need to reimplement similar functionality, probably using Celery
and Django REST Framework.
