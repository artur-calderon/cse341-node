export function errorHandler(err, req, res, next) {
	res.status(err.status || 500).json({
		success: false,
		error: err.name || "Internal Server Error",
		message: err.message || "An unexpected error occurred.",
	});
}
