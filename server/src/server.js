import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import app from "./app.js";
import { connectDatabase } from "./config/database.js";
import { initializeGridFS } from "./config/gridfs.js";

dotenv.config({
  path: fileURLToPath(new URL("../../.env", import.meta.url)),
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDatabase();
    initializeGridFS();

    app.listen(PORT, () => {
      console.log(`Portfolio API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();