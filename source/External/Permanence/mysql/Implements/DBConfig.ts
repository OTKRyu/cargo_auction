const DBConfig = {
  host: "localhost",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: "CARGO_AUCTION",
};

export default DBConfig;
