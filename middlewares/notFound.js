export function notFound(req, res, next) {
	res.status(404).json({
		success: false,
		error: "Not Found",
		message: `The route ${req.method} - ${req.originalUrl} was not found.`,
	});
	console.log(`404 Not Found: ${req.method} - ${req.originalUrl}`);
}
