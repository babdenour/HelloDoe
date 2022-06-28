import log from '../../../log';
import * as Mission from '../../../models/Mission';

interface RequestParams {
  id: string; // Id of a mission
}

interface Request {
  params: RequestParams;
}

export async function getCandidates(req: Request, res) {
  try {
    const mission: any = await Mission.findOne({ _id: req.params.id }).populate(['applicants', 'hired']).exec();

    if (mission === null) {
      return res.sendStatus(404);
    }

    const candidates: any[] = mission.hired
      .map((c) => ({
        id: c.id,
        firstName: c.profile.first_name,
        lastName: c.profile.last_name,
        email: c.profile.email,
        rating: c.rating,
        missions: c.missions,
        hired: true,
      }))
      .concat(
        mission.applicants.map((c) => ({
          id: c.id,
          firstName: c.profile.first_name,
          lastName: c.profile.last_name,
          email: c.profile.email,
          rating: c.rating,
          missions: c.missions,
          hired: false,
        })),
      );

    candidates.forEach((candidate: any) => {
      candidate.fbFirstName = '';
      candidate.fbLastName = '';
      candidate.img = '';
    });

    return res.status(200).json(candidates);
  } catch (e) {
    log.log('error', e);

    return res.sendStatus(500);
  }
}
