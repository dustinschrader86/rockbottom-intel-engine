import os
import uuid
from app.config import DATA_DIR

class FileManager:
    """
    Handles saving and loading files inside the data directory.
    """

    def __init__(self, base_dir: str = DATA_DIR):
        self.base_dir = base_dir
        os.makedirs(self.base_dir, exist_ok=True)

    def save_bytes(self, data: bytes, extension: str = ".bin") -> str:
        """
        Saves raw bytes to a file and returns the file path.
        """
        filename = f"{uuid.uuid4()}{extension}"
        path = os.path.join(self.base_dir, filename)

        with open(path, "wb") as f:
            f.write(data)

        return path

    def save_image(self, image, extension: str = ".png") -> str:
        """
       

