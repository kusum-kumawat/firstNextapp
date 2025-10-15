import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + fileName);
    // cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
