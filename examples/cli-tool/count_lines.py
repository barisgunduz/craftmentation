"""Small documentation fixture: count lines in a UTF-8 file."""
import argparse
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("path", type=Path, help="UTF-8 file to count")
    args = parser.parse_args()
    try:
        with args.path.open(encoding="utf-8") as source:
            count = sum(1 for _ in source)
    except (OSError, UnicodeError) as error:
        parser.exit(1, f"count_lines: {error}\n")
    print(count)


if __name__ == "__main__":
    main()
