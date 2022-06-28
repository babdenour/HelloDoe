import Config from '@/config';
import axios from 'axios';
import { DoerInterface } from '../types/doer.interface';

export interface AllWorkers {
  workers: DoerInterface[];
  nb_pages: number;
}

export default class WorkersService {
  async getAllWorkers(token, page?): Promise<AllWorkers> {
    const params = page !== undefined ? `page=${page}` : '';

    const url = `${Config.API_ENDPOINT_DOERS}?${params}`;
    const method = 'GET';
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const { data } = await axios({ url, method, headers });
      return data;
    } catch (e) {
      throw e;
    }
  }
}
