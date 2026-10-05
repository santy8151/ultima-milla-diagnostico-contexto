import { readFile } from "node:fs/promises";
import { neon } from "@neondatabase/serverless";

const envText = `${await readFile(".env", "utf8").catch(() => "")}\n${await readFile(".env.local", "utf8").catch(() => "")}`;
for (const line of envText.split(/\r?\n/)) {
  const match = line.match(/^\s*DATABASE_URL\s*=\s*["']?(.+?)["']?\s*$/);
  if (match && !process.env.DATABASE_URL) process.env.DATABASE_URL = match[1];
}

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL no está definido. No se necesita para la persistencia local JSON.");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const schema = await readFile("db/schema.sql", "utf8");
for (const statement of schema.split(";").map((part) => part.trim()).filter(Boolean)) {
  await sql.query(statement);
}
console.log("Esquema PostgreSQL listo.");
