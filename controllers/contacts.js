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

async function createContact(req, res) {
	try {
		const { firstName, lastName, email, favoriteColor, birthday } = req.body;

		if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const result = await db.collection("contacts").insertOne({
			firstName,
			lastName,
			email,
			favoriteColor,
			birthday,
		});

		res.status(201).json({
			message: "Contact created successfully",
			contactId: result.insertedId,
		});
	} catch (error) {
		console.error("Error creating contact:", error);
		res.status(500).json({ message: "Error creating contact" });
	}
}

async function updateContact(req, res) {
	try {
		const contactId = req.params.id;
		const { firstName, lastName, email, favoriteColor, birthday } = req.body;

		const result = await db.collection("contacts").updateOne(
			{ _id: new ObjectId(contactId) },
			{ $set: { firstName, lastName, email, favoriteColor, birthday } },
		);

		if (result.matchedCount === 0) {
			return res.status(404).json({ message: "Contact not found" });
		}

		res.status(200).json({ message: "Contact updated successfully" });
	} catch (error) {
		console.error("Error updating contact:", error);
		res.status(500).json({ message: "Error updating contact" });
	}
}

async function deleteContact(req, res) {
	try {
		const contactId = req.params.id;

		const result = await db.collection("contacts").deleteOne({
			_id: new ObjectId(contactId),
		});

		if (result.deletedCount === 0) {
			return res.status(404).json({ message: "Contact not found" });
		}

		res.status(200).json({ message: "Contact deleted successfully" });
	} catch (error) {
		console.error("Error deleting contact:", error);
		res.status(500).json({ message: "Error deleting contact" });
	}
}

export {
	getContacts,
	getContactById,
	createContact,
	updateContact,
	deleteContact,
};
