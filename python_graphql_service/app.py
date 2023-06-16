from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite+pysqlite:///:memory:"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)


from ariadne import load_schema_from_path, make_executable_schema, graphql_sync, snake_case_fallback_resolvers, ObjectType
from flask import request, jsonify
from queries import listElements_resolver
from mutations import create_element_resolver, delete_element_resolver

query = ObjectType("Query")
mutation = ObjectType("Mutation")

query.set_field("listElements", listElements_resolver)

mutation.set_field("createElement", create_element_resolver)
mutation.set_field("deleteElement", delete_element_resolver)

type_defs = load_schema_from_path("schema.graphql")
schema = make_executable_schema(
    type_defs, query, mutation, snake_case_fallback_resolvers
)

@app.route("/graphql", methods=["POST"])
def graphql_server():
    data = request.get_json()
    query = data['query']

    success, result = graphql_sync(
        schema,
        data=query,
        context_value=request,
        debug=app.debug
    )

    status_code = 200 if success else 400
    return jsonify(result), status_code