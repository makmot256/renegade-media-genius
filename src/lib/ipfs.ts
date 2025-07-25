import { Web3Storage } from "web3.storage";
/**
 * Uploads content to IPFS using Web3.Storage.
 * @param {string} content - The content to upload.
 * @returns {Promise<string>} - The CID of the uploaded content.
 */


export const uploadToIPFS = async (content: string): Promise<string> => {
  const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN! });
  const file = new File([content], "content.txt", { type: "text/plain" });
  return await client.put([file]);
};
//npm install web3.storage

//npm install --save-dev @types/web3.storage
