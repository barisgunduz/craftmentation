"""ASCII slug normalization fixture, not a published package."""
import re


def slugify(text: str) -> str:
    """Lowercase text and replace runs outside a-z/0-9 with a hyphen."""
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
