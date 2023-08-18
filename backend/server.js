const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const axios = require("axios");

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder where files will be saved
  },
  filename: (req, file, cb) => {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // const extname = path.extname(file.originalname);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file-upload"), async (req, res) => {
  const uploadedFilePath = req.file.path;

  try {
    const response = await axios.post(
      "http://cermine.ceon.pl/extract.do",
      fs.readFileSync(uploadedFilePath),
      {
        headers: {
          "Content-Type": "application/binary",
        },
      }
    );

    console.log("Response from external API:", response.data);

    fs.unlinkSync(uploadedFilePath); // Remove the temporary uploaded file

    return res.status(200).json({
      result: true,
      msg: "File uploaded and processed",
    });
  } catch (error) {
    console.error("Error uploading or processing the file:", error);
    return res.status(500).json({
      result: false,
      msg: "Error uploading or processing the file",
    });
  }
});

app.listen(8080, () => {
  console.log(`Server running on port 8080`);
});
