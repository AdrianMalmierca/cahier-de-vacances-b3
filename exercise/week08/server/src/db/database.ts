import Database from "better-sqlite3";
import path from "path";

//__dirname is the actual directory of the file
const DB_PATH =
    process.env.NODE_ENV === "test"
        ? ":memory:" //test do a db in memory, not the real
        : process.env.DB_PATH ?? path.join(__dirname, "../../zion-matrix.db");

export const db = new Database(DB_PATH);

db.pragma("journal_mode = WAL"); //to permit reads while writing into the data base

//active is boolean but sql doesnt have, so we use 
db.exec(`
    CREATE TABLE IF NOT EXISTS rules (
        id TEXT PRIMARY KEY,
        rule_key TEXT NOT NULL UNIQUE,
        description TEXT NOT NULL,
        active BOOLEAN NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS attempts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        password_hash TEXT NOT NULL,
        is_valid BOOLEAN NOT NULL,
        result_json TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
`);

const seedRules = db.prepare(`
    INSERT OR IGNORE INTO rules (id, rule_key, description, active)
    VALUES (@id, @ruleKey, @description, @active)
`);

const defaultRules = [
    { id: "rule-length", ruleKey: "length", description: "Password must be at least 8 characters long", active: true },
    { id: "rule-uppercase", ruleKey: "uppercase", description: "Needs at least 1 uppercase", active: true },
    { id: "rule-lowercase", ruleKey: "lowercase", description: "Needs at least 1 lowercase", active: true },
    { id: "rule-number", ruleKey: "number", description: "Needs at least 1 number", active: true },
    { id: "rule-symbol", ruleKey: "symbol", description: "Include at least one of . * # @ $ % &", active: true },
    { id: "rule-forbidden", ruleKey: "forbidden", description: "Unauthorized glyph detected!", active: true },
];

const seedAll = db.transaction((rules: typeof defaultRules) => {
    for (const rule of rules) {
        seedRules.run({
            id: rule.id,
            ruleKey: rule.ruleKey,
            description: rule.description,
            active: rule.active ? 1 : 0, //1 or 0 because better-sqlite3 doesnt accept booleans
        });
    }
});

seedAll(defaultRules);

//separate rules and attempt in two files because of responsabilities, this file is to ask if the password is valid
//attempt logger is to ask how we say an intent has happened