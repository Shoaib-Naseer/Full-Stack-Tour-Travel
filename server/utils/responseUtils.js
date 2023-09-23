function sendSuccessResponse(reply, data,statusCode = 200) {
    return reply.status(statusCode).send({ message: "success", data });
  }
  
  function sendFailureResponse(reply, error) {
    return reply.status(400).send({ message: "failure", error });
  }
  
  function sendNotFoundResponse(reply, message) {
    return reply.status(404).send({ message: "failure", error: message });
  }
  
  module.exports = {
    sendSuccessResponse,
    sendFailureResponse,
    sendNotFoundResponse,
  };
  