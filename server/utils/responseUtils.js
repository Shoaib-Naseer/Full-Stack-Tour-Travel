function sendSuccessResponse(
  reply,
  body,
  statusCode = 200,
  errorMessage = null,
) {
  const response = { message: "success", data: body };
  if (errorMessage) {
    response.error = errorMessage; // Include the error message if provided
  }
  return reply.status(statusCode).send(response);
}

function sendFailureResponse(reply, message, statusCode = 400) {
  return reply.status(statusCode).send({ message: "failure", error: message });
}

function sendNotFoundResponse(reply, message, statusCode = 40) {
  return reply.status(statusCode).send({ message: "failure", error: message });
}

module.exports = {
  sendSuccessResponse,
  sendFailureResponse,
  sendNotFoundResponse,
};
