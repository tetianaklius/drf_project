from enum import Enum


class RegexEnum(Enum):
    PHONE = (
        r"^(((\+?38)[-\s\(\.]?\d{3}[-\s\)\.]?)|([\.(]?0\d{2}[\.)]?))?[-\s\.]?\d{3}[-\s\.]?\d{2}[-\s\.]?\d{2}$",
        # for ukrainian numbers
        "Please enter a correct phone number"
    )

    NAME = (
        r"^[A-Za-zА-Яа-яїЇіІйєю -]{,30}$",
        "Only alpha characters are allowed"
    )

    def __init__(self, pattern: str, msg: str):
        self.pattern = pattern
        self.msg = msg
