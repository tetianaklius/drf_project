from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import exception_handler


def error_handler(exception: Exception, context: dict):
    handlers = {
        "JWTException": _jwt_validation_exception_handler,
        "ProfanityCheckException": _profanity_check_exception_handler,
        "PropertyCheckException": _permission_check_exception_handler,
    }
    response = exception_handler(exception, context)
    exception_class = exception.__class__.__name__

    if exception_class in handlers:
        return handlers[exception_class](exception, context)

    return response

def _jwt_validation_exception_handler(exception, context):
    return Response({"detail": "JWT expired or invalid"}, status.HTTP_401_UNAUTHORIZED)

def _profanity_check_exception_handler(exception, context):
    return Response(
        {
            "Message": "Sorry, but your post contains profanity words. You need to edit it. "
                       "You have 3 attempts to do it before the post becomes inactive and an email asking for review "
                       "will be sent to the platform manager.",
        },
        # тут має вивестися посилання, за яким можна редагувати (id оголошення треба) todo
        status.HTTP_406_NOT_ACCEPTABLE
    )

def _permission_check_exception_handler(exception, context):
    return Response(
        {
            "Message": "Only author of the post can edit or delete it.",
        },
        status.HTTP_403_FORBIDDEN
    )
