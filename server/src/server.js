import express from "express";
import { ENV } from "./config/env.js";
import { connectDb } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "../src/config/inngest.js";

const app = express();
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
  res.json({
    status: "ok",
  });
});

const startServer = async () => {
  try {
    await connectDb();
    if (ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => {
        console.log("Listening on PORT", ENV.PORT);
      });
    }
  } catch (error) {
    console.log("Error starting the server", error);
    process.exit(1);
  }
};

startServer();
export default app;
