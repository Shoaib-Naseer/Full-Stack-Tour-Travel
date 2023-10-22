const config = require("../config");

function getFileURL(filePath) {
  const serverAddress = `http://localhost:${config.app.port}`;
  if (!filePath.startsWith("/")) {
    filePath = `/${filePath}`;
  }

  return `${serverAddress}${filePath}`;
}

module.exports = {
    getFileURL
}
