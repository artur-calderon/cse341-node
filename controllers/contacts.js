import { db } from "../models/databaseConfig.js";
import { ObjectId } from "mongodb";

async function getContacts(req, res) {
	try {
		const contatctsCollection = await db
			.collection("contacts")
			.find()
			.toArray();
		res.status(200).json({
			message: "Contacts retrieved successfully",
			contacts: contatctsCollection,
		});
	} catch (error) {
		console.error("Error retrieving contacts:", error);
		res.status(500).json({ message: "Error retrieving contacts" });
	}
}

async function getContactById(req, res) {
	try {
		const contactId = req.params.id;
		const contact = await db
			.collection("contacts")
			.findOne({ _id: new ObjectId(contactId) });
		res.status(200).json({
			message: "Contact retrieved successfully",
			contact,
		});
	} catch (error) {
		console.error("Error retrieving contact:", error);
		res.status(500).json({ message: "Error retrieving contact" });
	}
}

export { getContacts, getContactById };
