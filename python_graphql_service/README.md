- we create a virttual environment
python3 -m venv python_graphql_service

- we activate our virtual env
source python_graphql_service/bin/activate

- dependencies which we need
pip install flask ariadne flask-sqlalchemy flask-cors

- we tell Flask to start the application by looking at our app.py file
export FLASK_APP=app.py

- and we can run our app by using this command:
flask run