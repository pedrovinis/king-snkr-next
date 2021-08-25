import { NextApiRequest, NextApiResponse } from 'next';
import { COOKIE } from '@lib/constants';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const id = req.cookies[COOKIE];
  if (!id) {
    return res.status(401).json({
      error: {
        code: 'missing_cookie',
        message: 'Missing cookie'
      }
    });
  }


  return res.status(200).json({ loggedIn: true });
}
