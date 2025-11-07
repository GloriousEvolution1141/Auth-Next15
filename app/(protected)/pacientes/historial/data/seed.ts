import fs from "fs";
import path from "path";

const tasksPath = path.join(__dirname, "tasks.json");
const tasks = JSON.parse(fs.readFileSync(tasksPath, "utf8"));

console.log("✅ Tasks cargadas desde archivo existente.", tasks.length);
