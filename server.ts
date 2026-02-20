import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs-extra";
import path from "path";
import AdmZip from "adm-zip";
import chokidar from "chokidar";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const MINECRAFT_PATH = path.resolve("./.minecraft");
const VERSIONS_PATH = path.join(MINECRAFT_PATH, "versions");
const MODS_PATH = path.join(MINECRAFT_PATH, "mods");
const CONFIG_FILE = path.join(MINECRAFT_PATH, "config.json");

// Ensure directories exist
async function ensureDirectories() {
  await fs.ensureDir(VERSIONS_PATH);
  await fs.ensureDir(MODS_PATH);
  if (!(await fs.pathExists(CONFIG_FILE))) {
    await fs.writeJson(CONFIG_FILE, {
      ram: 8,
      javaPath: "java",
      resolution: "1920x1080",
      fullscreen: false,
      shaders: true
    });
  }

  // Create some mock data if empty
  const versions = await fs.readdir(VERSIONS_PATH);
  if (versions.length === 0) {
    await fs.ensureDir(path.join(VERSIONS_PATH, "1.21.0"));
    await fs.ensureDir(path.join(VERSIONS_PATH, "1.20.4"));
    await fs.ensureDir(path.join(VERSIONS_PATH, "1.8.9"));
  }
}

// API: Get Versions
app.get("/api/versions", async (req, res) => {
  try {
    const versions = await fs.readdir(VERSIONS_PATH);
    res.json(versions);
  } catch (err) {
    res.status(500).json({ error: "Failed to read versions" });
  }
});

// API: Get Mods
app.get("/api/mods", async (req, res) => {
  try {
    const files = await fs.readdir(MODS_PATH);
    const mods = await Promise.all(
      files.filter(f => f.endsWith(".jar") || f.endsWith(".jar.disabled")).map(async (file) => {
        const filePath = path.join(MODS_PATH, file);
        const enabled = !file.endsWith(".disabled");
        let metadata = { name: file, version: "unknown", icon: null };

        try {
          const zip = new AdmZip(filePath);
          const fabricJson = zip.getEntry("fabric.mod.json");
          if (fabricJson) {
            const data = JSON.parse(fabricJson.getData().toString("utf8"));
            metadata.name = data.name || metadata.name;
            metadata.version = data.version || metadata.version;
          }
        } catch (e) {
          // Fallback if zip is invalid or missing metadata
        }

        return {
          id: file,
          name: metadata.name,
          version: metadata.version,
          enabled,
          file
        };
      })
    );
    res.json(mods);
  } catch (err) {
    res.status(500).json({ error: "Failed to read mods" });
  }
});

// API: Toggle Mod
app.post("/api/mods/toggle", async (req, res) => {
  const { file, enabled } = req.body;
  try {
    const oldPath = path.join(MODS_PATH, file);
    let newFile = file;
    if (enabled && file.endsWith(".disabled")) {
      newFile = file.replace(".disabled", "");
    } else if (!enabled && !file.endsWith(".disabled")) {
      newFile = file + ".disabled";
    }
    const newPath = path.join(MODS_PATH, newFile);
    await fs.move(oldPath, newPath);
    res.json({ success: true, newFile });
  } catch (err) {
    res.status(500).json({ error: "Failed to toggle mod" });
  }
});

// API: Config
app.get("/api/config", async (req, res) => {
  try {
    const config = await fs.readJson(CONFIG_FILE);
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: "Failed to read config" });
  }
});

app.post("/api/config", async (req, res) => {
  try {
    await fs.writeJson(CONFIG_FILE, req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to save config" });
  }
});

// API: Microsoft OAuth (Simplified for demo)
app.get("/api/auth/url", (req, res) => {
  const clientId = process.env.MICROSOFT_CLIENT_ID || "MOCK_ID";
  const redirectUri = `${process.env.APP_URL}/auth/callback`;
  const url = `https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&response_mode=query&scope=XboxLive.signin%20offline_access`;
  res.json({ url });
});

app.get("/auth/callback", (req, res) => {
  // In a real app, exchange code for token here
  // For demo, we'll just send a success message
  res.send(`
    <html>
      <body>
        <script>
          window.opener.postMessage({ 
            type: 'OAUTH_AUTH_SUCCESS',
            user: {
              name: 'Steve_Gamer123',
              uuid: '069a79f4-44e9-4726-a5be-fca90e38aaf5',
              skinUrl: 'https://picsum.photos/seed/steve/100/100'
            }
          }, '*');
          window.close();
        </script>
      </body>
    </html>
  `);
});

async function startServer() {
  await ensureDirectories();

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
