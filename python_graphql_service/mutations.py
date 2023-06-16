from ariadne import convert_kwargs_to_snake_case

from app import db
from models import Elements

@convert_kwargs_to_snake_case
def create_element_resolver(obj, info, width, height, x, y, color):
    try:
        element = Elements(
            width=width, height=height, x=x, y=y, color=color
        )
        db.session.add(element)
        db.session.commit()
        payload = {
            "success": True,
            "element": element.to_dict()
        }
    except ValueError:
        payload = {
            "success": False,
            "errors": ['error']
        }

    return payload

@convert_kwargs_to_snake_case
def delete_element_resolver(obj, info, id):
    try:
        element = Elements.query.get(id)
        db.session.delete(element)
        db.session.commit()
        payload = {"success": True, "element": element.to_dict()}

    except AttributeError:
        payload = {
            "success": False,
            "errors": ["Not found"]
        }

    return payload