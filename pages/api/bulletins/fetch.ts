import * as fs from 'fs/promises'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { IBullet } from '../../../typings'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IBullet[]>
) {

    if (req.headers.host !== process.env.URL) return res.status(403).send("Get your own API lol" as any)

}
