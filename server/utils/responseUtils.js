function sendSuccessResponse(reply, body,statusCode = 200) {
    return reply.status(statusCode).send({ message: "success", data:body });
  }
  
  function sendFailureResponse(reply, message,statusCode = 400) {
    return reply.status(statusCode).send({ message: "failure", error:message });
  }
  
  function sendNotFoundResponse(reply, message,statusCode = 40) {
    return reply.status(statusCode).send({ message: "failure", error: message });
  }
  
  module.exports = {
    sendSuccessResponse,
    sendFailureResponse,
    sendNotFoundResponse,
  };
  