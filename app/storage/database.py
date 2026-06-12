import json
import os
from app.config import DATA_DIR

DB_PATH = os.path.join(DATA_DIR, "database.json")

class Database:
    """
    Simple JSON-based storage engine.
    """

    def __init__(self, path: str = DB_PATH):
        self.path = path
        if not os.path.exists(self.path):
            self._write({})

    def _read(self) -> dict:
        with open(self.path, "r") as f:
            return json.load(f)

    def _write(self, data: dict):
        with open(self.path, "w") as f:
            json.dump(data, f, indent=4)

    def get(self, key: str, default=None):
        data = self._read()
        return data.get(key, default)

    def set(self, key: str, value):
        data = self._read()
        data[key] = value
        self._write(data)

    def append(self, key: str, value):
        data = self._read()
        if key not in data:
            data[key] = []
        data[key].append(value)
        self._write(data)

