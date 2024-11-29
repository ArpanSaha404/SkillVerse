import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads/");
  },
  filename: (_, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  fileFilter: (_, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid File Type...Only Images/Videos are allowed..."));
    }
  },
});

export const deleteTempFile = (filePath: string) => {
  if (filePath) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Failed to Delete Temporary File :", err);
      }
    });
  }
};

export default upload;
