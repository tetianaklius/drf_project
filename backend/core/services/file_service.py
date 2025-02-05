import os.path
from uuid import uuid4


def upload_post_image(instance, filename: str) -> str:
    ext = filename.split(".")[-1]
    return os.path.join(str(instance.id), f"__{uuid4()}.{ext}")
