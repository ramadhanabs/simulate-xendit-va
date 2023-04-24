import type { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"

type Data = {
  status: string
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const url = process.env.NEXT_PUBLIC_SIMULATE_API || ""
  try {
    const response = await axios.post(url, req.body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${process.env.NEXT_PUBLIC_TOKEN_XENDIT}`,
      },
    })
    res.status(200).json({ ...response.data })
  } catch (error: any) {
    res.status(error.response.status).json({...error.response.data})
  }
}
