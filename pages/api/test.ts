import type { NextApiRequest, NextApiResponse } from 'next'
import Connection from '../../db/connection'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const connection = await Connection.createConnect()

    console.log(req)

    if (connection instanceof Error) return res.status(500).send(connection.message)
    return res.status(200).send("it works")
}
