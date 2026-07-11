import express from "express";
import {
	getContacts,
	getContactById,
	createContact,
	updateContact,
	deleteContact,
} from "./controllers/contacts.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.send("Welcome to the API!");
});

router.get("/contacts", getContacts);
router.get("/contacts/:id", getContactById);
router.post("/contacts", createContact);
router.put("/contacts/:id", updateContact);
router.delete("/contacts/:id", deleteContact);

export default router;
