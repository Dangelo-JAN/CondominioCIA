import express from "express";
import { HandleContactSalesRequest } from "../controllers/ContactSales.controller.js";

const router = express.Router();

router.post("/sales", HandleContactSalesRequest);

export default router;
