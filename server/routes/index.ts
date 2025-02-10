import { Router } from "express";
import tmp from "./tmp";

const router = Router();

router.use("/tmp", tmp);

export default router;
