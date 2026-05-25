const http = require("http");
const app = require("./app");
const connectDB = require("./config/mongodb");
const initSocket = require("./config/socket");
require("dotenv").config();

async function bootstrap() {
  await connectDB();

  const server = http.createServer(app);
  await initSocket(server);

  server.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running on port ${process.env.PORT || 8080}`);
  });
}

bootstrap().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
