import config from "./config/config";
import { PrismaClient } from "@prisma/client";

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

import app from "./app";

// DB connection
const prisma = new PrismaClient({
  errorFormat: "pretty",
  rejectOnNotFound: true,
  log: ["query", "info", "warn"],
});

prisma
  .$connect()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("DB connected successfully!");
  })
  // eslint-disable-next-line no-console
  .catch((err: Error) => console.log(err));

const port = process.env.PORT || config.PORT || 8080;
const server = app.listen(port, () => {
  console.log(
    `Server started on PORT: ${port} in ${process.env.NODE_ENV?.trim().toUpperCase()} mode`
  );
});

process.on("unhandledRejection", (err: Error) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
