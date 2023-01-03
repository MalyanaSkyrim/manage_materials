// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@pragma/database'

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  const examples = await db.location.findMany()
  res.status(200).json(examples)
}

export default examples
