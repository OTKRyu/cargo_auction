import dotenv from "dotenv";

dotenv.config();

const DB_CONFIG = {
  host: "localhost",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: "CARGO_AUCTION",
};

export default DB_CONFIG;
