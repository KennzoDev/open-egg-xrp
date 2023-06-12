// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { XummSdk } = require("xumm-sdk");

const sdk = new XummSdk(process.env.XUMM_API_KEY, process.env.XUMM_API_SECRET);
export default async function handler(req, res) {
  try {
    const newPayload = await sdk.payload.create({
      txjson: { TransactionType: "SignIn" },
      options: { pathfinding_fallback: false, force_network: "N/A" },
    });
    const payload = await sdk.payload.get(newPayload);
    return res.status(200).json(payload.meta.uuid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
