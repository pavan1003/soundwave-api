import { saveContact } from "../models/contactModel.js";
import validator from "validator";

export async function submitContact(req, res) {
  console.log(req.body);
  let { name, email, subject, message } = req.body;

  // Basic trim to remove excess whitespace
  name = name?.trim();
  email = email?.trim();
  subject = subject?.trim();
  message = message?.trim();

  // Input validations
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  if (!validator.isLength(name, { min: 2, max: 50 })) {
    return res.status(400).json({ error: "Name must be between 2 and 50 characters." });
  }

  if (!validator.isLength(subject, { min: 2, max: 100 })) {
    return res.status(400).json({ error: "Subject must be between 2 and 100 characters." });
  }

  if (!validator.isLength(message, { min: 5, max: 1000 })) {
    return res.status(400).json({ error: "Message must be between 5 and 1000 characters." });
  }

  // Sanitization
  const sanitizedData = {
    name: validator.escape(name),
    email: validator.normalizeEmail(email),
    subject: validator.escape(subject),
    message: validator.escape(message),
  };

  try {
    const id = await saveContact(sanitizedData);
    return res.status(201).json({ message: "Contact form submitted successfully", id });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
