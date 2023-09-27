# Creating virtual environment
-m venv venv

# Activating virtual environment
venv/scripts/activate

# Updating package installer (PIP)
python -m pip install --upgrade pip

# Installing a framework (in this case Django)
pip install django

# Creating a project
django-admin startproject store_project

# Entering the project's folder
cd store_project

# Creating an application
python manage.py startapp store

# Creating auxiliary tables in the database
python manage.py migrate

# Starting the server
python manage.py runserver

# When changing the database structure
python manage.py makemigrations
python manage.py migrate

# Superuser (admin) registration
python manage.py createsuperuser