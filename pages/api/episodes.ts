import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { Episode } from '../../components/Episodes'

type Episodes = {
  data: Episode[]
  meta: {
    currentPage: number
    totalPages: number
    totalCount: number
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Episodes>
) {
  const { data, status } = await axios(
    'https://api.transistor.fm/v1/episodes',
    {
      headers: {
        'x-api-key': process.env.TRANSISTORFM_API_KEY,
      },
    }
  )

  return res.status(status).json(data)
}
