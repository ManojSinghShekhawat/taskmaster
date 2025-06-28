const app = require("./app");
const connectDB = require("./config/dbConnection");
require("dotenv").config({ path: "./.env" });
const PORT = process.env.PORT;

connectDB();
const server = app.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});

process.on("uncaughtException", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  server.close(() => {
    process.exit(0);
  });
});
