import multer from "multer";

//! per la gestione delle img caricate
const storage = multer.diskStorage({
  destination: "./public/img/movies_cover",
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });
export default upload;
