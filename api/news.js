import nextConnect from "next-connect";
import multer from "multer";
import mysql from "mysql2";
import path from "path";

// Konfigurasi multer
const upload = multer({
  dest: "public_html/uploads/",
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(ext)) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

// Buat koneksi pool MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const handler = nextConnect({
  onError(error, req, res) {
    res.status(500).json({ error: error.message });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// GET - ambil semua news
handler.get((req, res) => {
  pool.query("SELECT * FROM news ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.status(200).json(results);
  });
});

// POST - tambah news dengan gambar
handler.use(upload.single("image")).post((req, res) => {
  const { title_id, title_en, summary_id, summary_en, content_id, content_en } = req.body;

  const image = req.file ? req.file.filename : null;

  pool.query(
    `INSERT INTO news (
      title_id, title_en,
      summary_id, summary_en,
      content_id, content_en,
      image, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
    [title_id, title_en, summary_id, summary_en, content_id, content_en, image],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Failed to insert news" });
      res.status(201).json({ message: "News created", id: result.insertId });
    }
  );
});

// PUT - update news
handler.put((req, res) => {
  const { id, title_id, title_en, summary_id, summary_en, content_id, content_en } = req.body;

  pool.query(
    `UPDATE news SET
      title_id = ?, title_en = ?,
      summary_id = ?, summary_en = ?,
      content_id = ?, content_en = ?
    WHERE id = ?`,
    [title_id, title_en, summary_id, summary_en, content_id, content_en, id],
    (err) => {
      if (err) return res.status(500).json({ error: "Failed to update news" });
      res.status(200).json({ message: "News updated" });
    }
  );
});

// DELETE - hapus news
handler.delete((req, res) => {
  const id = req.query.id;
  pool.query("DELETE FROM news WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Failed to delete news" });
    res.status(200).json({ message: "News deleted" });
  });
});

// Nonaktifkan body parser bawaan
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
