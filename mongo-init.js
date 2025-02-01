const username = process.env.MONGO_INITDB_ROOT_USERNAME || "defaultUser";
const password = process.env.MONGO_INITDB_ROOT_PASSWORD || "defaultPassword";
const dbName = process.env.MONGO_INITDB_DATABASE || "defaultDB";

db = db.getSiblingDB(dbName);

db.createUser({
  user: username,
  pwd: password,
  roles: [{ role: "readWrite", db: dbName }]
});
