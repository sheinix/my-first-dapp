import axios from "axios";
import * as fs from "fs";
const ETHERSCAN_API_KEY = process.env.ETHERESCAN_API_KEY; // Get it from https://etherscan.io/myapikey
const CONTRACT_ADDRESS = "0xB3476BCAC50Bb772F7ea1D1307a3214A0A7D6DE5";
// To get NZDD Abi implementation: "0x0e140Cf7291B61ce04D1dDAD4b1DD198935c3330";
// proxy contract: 0xE91d143072fc5e92e6445f18aa35DBd43597340c
const OUTPUT_FILE = `abis/${CONTRACT_ADDRESS}.json`; // Save ABI in 'abis' folder
async function fetchAndSaveABI() {
  try {
    console.log(`Fetching ABI for contract: ${CONTRACT_ADDRESS}...`);
    const response = await axios.get(
      `https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${CONTRACT_ADDRESS}&apikey=${ETHERSCAN_API_KEY}`,
    );
    if (response.data.status !== "1") {
      throw new Error(`Error fetching ABI: ${response.data.result}`);
    }
    const abi = JSON.parse(response.data.result);
    fs.mkdirSync("abis", { recursive: true }); // Ensure 'abis' folder exists
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(abi, null, 2));
    console.log(`✅ ABI saved to ${OUTPUT_FILE}`);
  } catch (error) {
    console.error("Error fetching or saving ABI:", error);
  }
}
fetchAndSaveABI();
