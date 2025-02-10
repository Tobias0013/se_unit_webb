import { Router } from "express";

const tmp = Router();

tmp.get("/", (req, res) => {
    const date = new Date;
    res.json({date: date.toLocaleTimeString()});
});

export default tmp;
