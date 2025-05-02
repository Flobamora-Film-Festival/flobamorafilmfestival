import mysql from "mysql2";
import multer from "multer";
import path from "path";

// Setup Multer untuk upload file gambar
const upload = multer({
  dest: "public_html/uploads/", // Folder untuk menyimpan gambar di public_html
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

// Setup Pool untuk koneksi MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default function handler(req, res) {
  // Membuka koneksi dari pool
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: "Failed to connect to database" });
    }

    if (req.method === "GET") {
      connection.query("SELECT * FROM articles", (err, results) => {
        connection.release(); // Kembalikan koneksi ke pool
        if (err) return res.status(500).json({ error: "Database query failed" });
        res.status(200).json(results);
      });
    } else if (req.method === "POST") {
      // Gunakan multer untuk upload gambar
      upload.single("image")(req, res, (err) => {
        if (err) return res.status(400).json({ error: err.message });

        const { title, content } = req.body;
        const image = req.file ? req.file.filename : null; // Ambil nama file jika ada

        connection.query("INSERT INTO articles (title, content, image, created_at) VALUES (?, ?, ?, NOW())", [title, content, image], (err, result) => {
          connection.release(); // Kembalikan koneksi ke pool
          if (err) return res.status(500).json({ error: "Failed to insert article" });
          res.status(201).json({ message: "Article created", id: result.insertId });
        });
      });
    } else if (req.method === "PUT") {
      const { id, title, content } = req.body;
      connection.query("UPDATE articles SET title = ?, content = ? WHERE id = ?", [title, content, id], (err, result) => {
        connection.release(); // Kembalikan koneksi ke pool
        if (err) return res.status(500).json({ error: "Failed to update article" });
        res.status(200).json({ message: "Article updated" });
      });
    } else if (req.method === "DELETE") {
      const id = req.query.id;
      connection.query("DELETE FROM articles WHERE id = ?", [id], (err) => {
        connection.release(); // Kembalikan koneksi ke pool
        if (err) return res.status(500).json({ error: "Failed to delete article" });
        res.status(200).json({ message: "Article deleted" });
      });
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  });
}
