import express, { Express } from "express";
// import "dotenv/config";
import path from "path";
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes";

const app: Express = express();

const PORT: string | number = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", todoRoutes);

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

const uri: string = `${
  process.env.MONGODB_URI || "mongodb://localhost/typescript-todos"
}`;

mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () => {
      console.log(
        `db connection: ${process.env.MONGODB_URI ? "atlas" : `localhost`}`
      );
      console.log(`server running on port: ${PORT}`);
    })
  )
  .catch((error) => {
    throw error;
  });
