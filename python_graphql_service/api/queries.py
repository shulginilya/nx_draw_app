from ariadne import convert_kwargs_to_snake_case

from .models import Element

@convert_kwargs_to_snake_case
def listElements_resolver(obj, info):
    try:
        elements = [element.to_dict() for element in Element.query.all()]
        payload = {
            "success": True,
            "elements": elements
        }
    except Exception as error:
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload