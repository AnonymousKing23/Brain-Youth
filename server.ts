import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EMAILS_FILE = path.join(__dirname, "emails.json");

// Ensure emails file exists
if (!fs.existsSync(EMAILS_FILE)) {
  fs.writeFileSync(EMAILS_FILE, JSON.stringify([]));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API to collect emails
  app.post("/api/collect-email", (req, res) => {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Invalid email" });
    }

    try {
      const data = fs.readFileSync(EMAILS_FILE, "utf-8");
      const emails = JSON.parse(data);
      
      // Add email with timestamp
      emails.push({
        email,
        timestamp: new Date().toISOString()
      });

      fs.writeFileSync(EMAILS_FILE, JSON.stringify(emails, null, 2));
      res.json({ success: true });
    } catch (err) {
      console.error("Error saving email:", err);
      res.status(500).json({ error: "Storage error" });
    }
  });

  // Admin API to fetch emails (protected by simple secret in demo)
  app.get("/api/admin/emails", (req, res) => {
    const secret = req.query.secret;
    const ADMIN_SECRET = "brainyouth2026";

    if (secret !== ADMIN_SECRET) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const data = fs.readFileSync(EMAILS_FILE, "utf-8");
      const emails = JSON.parse(data);
      res.json(emails);
    } catch (err) {
      res.status(500).json({ error: "Read error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
