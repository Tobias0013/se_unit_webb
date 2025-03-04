export const API_URL = getAPIURL();
function getAPIURL() {
  if (process.env.MOCK === "true") {
    return "";
  }
  const url = process.env.API_URL;
  if (!url || url === "" || typeof url !== "string") {
    stopProcess("Missing appropriate API in environment file");
    return "";
  }
  return url;
}

export const MOCK = getMock();
function getMock() {
  const mock = process.env.MOCK;
  if (mock && mock === "true") {
    return true;
  }
  return false;
}

function stopProcess(message: string) {
  console.error(message);
  process.exit(0);
}
