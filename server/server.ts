import express from "express";
import { port } from "./controller/config"
import router from "./routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("dist"));
app.use(cors());

app.use("/", router);

app.listen(port, () => {
    console.log(`Server started successfully.\nListening on http://localhost:${port}`);
});
