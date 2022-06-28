import log from '../../../log';
import * as WorkerModel from '../../../models/Worker';
import { WorkerInterface } from '../../../types/worker.interface';
import { isUndefined } from '../../../utils/nativeTypes';

const Worker = WorkerModel as any;

const PAGE_SIZE = 15;

interface Request {
  query: {
    page?: number;
  };
}

export async function getDoers(req: Request, res) {
  const { page } = req.query;

  try {
    if (!isUndefined(page)) {
      const filteredDoers = await Worker.filterWorkers('profile.first_name', page, PAGE_SIZE);

      // Get Doers' profile pictures
      filteredDoers.docs.forEach((doer: WorkerInterface) => {
        doer.profile.imgUrl = '';
      });

      // Build response
      const response = {
        workers: filteredDoers.docs,
        nb_pages: filteredDoers.pages,
      };

      res.status(200).json(response);
    } else {
      const doers = await Worker.find({}).where('profile.first_name').ne(undefined).sort('profile.first_name').exec();

      // Build response
      const response = {
        workers: doers,
        nb_pages: 1,
      };

      res.status(200).json(response);
    }
  } catch (e) {
    log.error(e);
    res.sendStatus(500);
  }
}
