from app.storage.database import Database
from app.storage.file_manager import FileManager

def test_database_set_and_get():
    db = Database()
    db.set("test_key", "test_value")
    assert db.get("test_key") == "test_value"

def test_database_append():
    db = Database()
    db.set("list_key", [])
    db.append("list_key", "item1")
    db.append("list_key", "item2")
    assert db.get("list_key") == ["item1", "item2"]

def test_file_manager_save_and_load():
    fm = FileManager()
    data = b"hello world"
    path = fm.save_bytes(data, extension=".txt")
    loaded = fm.load(path)
    assert loaded == data

