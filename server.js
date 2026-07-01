import express from "express";
import router from "./routes.js";
import "dotenv/config";
import { run } from "./models/databaseConfig.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use(router);
app.listen(PORT, async () => {
	try {
		await run();
		console.log(`Server is running on port ${PORT}`);
	} catch (error) {
		console.error("Error starting the server:", error);
	}
});
