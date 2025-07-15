import { Router } from "express";
const contactRouter = Router();
import { submitContact } from "../controllers/contactController.js";
import { contactFormLimiter } from "../middlewares/rateLimiter.js";

contactRouter.post("/submit", contactFormLimiter, submitContact);

export default contactRouter;
