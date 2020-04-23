import { NowRequest, NowResponse } from '@now/node';
import https from 'https';
import querystring from 'querystring';

export default (req: NowRequest, res: NowResponse) => {
  const UNSPLASH_CLIENT_ID = process.env.UNSPLASH_CLIENT_ID;

  if (!UNSPLASH_CLIENT_ID) {
    return res.json({
      error: 'no client id',
    });
  }

  const unsplashUrl = 'https://api.unsplash.com/photos?' + querystring.stringify(req.query);

  https.get(
    unsplashUrl,
    {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_CLIENT_ID}`,
        'Accept-Version': 'v1',
      },
    },
    unsplashRes => {
      res.setHeader('x-total', unsplashRes.headers['x-total']);
      unsplashRes.pipe(res);
    },
  );
};
