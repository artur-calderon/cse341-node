import express from "express";
import router from "./routes.js";
import "dotenv/config";
import { run } from "./models/databaseConfig.js";
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const swaggerDocument = JSON.parse(
	readFileSync(join(__dirname, "swagger.json"), "utf8"),
);

const PORT = process.env.PORT || 8080;

swaggerDocument.servers[0].url = `http://localhost:${PORT}`;

if (process.env.RENDER_EXTERNAL_URL) {
	swaggerDocument.servers.push({
		url: process.env.RENDER_EXTERNAL_URL,
		description: "Production (Render)",
	});
}
const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(router);
app.listen(PORT, async () => {
	try {
		await run();
		console.log(`Server is running on port ${PORT}`);
	} catch (error) {
		console.error("Error starting the server:", error);
	}
});
