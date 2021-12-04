// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
export default async function handler(req, res) {
  const api = axios.create({
    baseURL: 'https://api.github.com',
  });
  try {
    const response = await api.get('/repos/apptension/openwind/issues');
    const data = response.data;
    if (data) {
      res.status(200).json({ data });
    } else {
      res.status(404);
    }
  } catch (e) {
    res.status(500);
  }
}
