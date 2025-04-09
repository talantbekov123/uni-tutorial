const axios = require("axios");

export async function checkHoneypot(contractAddress: string, chainID: '8453') {
  try {
    // Construct the API URL with the provided contract address and chainID
    const apiUrl = `https://api.honeypot.is/v2/IsHoneypot?address=${contractAddress}&chainID=${chainID}`;

    // Make the GET request
    const response = await axios.get(apiUrl);
    // Check the risk level in the response
    const risk = response.data?.summary?.risk;
    if (risk === "low") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
