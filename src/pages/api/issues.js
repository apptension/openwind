// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
export default async function handler(req, res) {
  const api = axios.create({
    baseURL: 'https://api.github.com',
  });
  try {
    const response = await api.get('/repos/apptension/openwind/issues', {
      withCredentials: true,
      auth: {
        username: process.env.GITHUB_CLIENT,
        password: process.env.GITHUB_SECRET,
      },
      params: { filter: 'element' },
    });
    const data = response.data;
    if (data) {
      res.status(200).json(data);
      res.end();
    } else {
      res.status(404);
      res.end();
    }
  } catch (e) {
    console.log(e);
    res.status(500);
    res.end();
  }
}
