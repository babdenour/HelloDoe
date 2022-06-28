import { CandidateFactory } from '@business';

import { CandidateAdapter } from './candidate.adapter';

describe('CandidateAdapter', () => {
  describe('toApi', () => {
    it('should convert candidate to api object', () => {
      const candidateImpl = CandidateFactory.create({
        age: 23,
        appliedAt: 1000,
        contactInformation: {
          email: 'email',
          phone: 'phone',
        },
        firstName: 'firstName',
        id: '1',
        isFavorite: true,
        lastName: 'lastName',
        score: 10,
        status: 'FAVORITE',
        isSeen: true,
        videoCvs: [
          {
            id: 'id',
            imgUrl: 'imgUrl',
            question: 'question',
            videoUrl: 'videoUrl',
          },
        ],
      });

      const candidateApi = CandidateAdapter.toApi(candidateImpl);

      expect(candidateApi.age).toBe(23);
      expect(candidateApi.appliedAt).toBe(1000);
      expect(candidateApi.contactInformation.email).toBe('email');
      expect(candidateApi.contactInformation.phone).toBe('phone');
      expect(candidateApi.firstName).toBe('firstName');
      expect(candidateApi.id).toBe('1');
      expect(candidateApi.isFavorite).toBe(true);
      expect(candidateApi.isSeen).toBe(true);
      expect(candidateApi.lastName).toBe('lastName');
      expect(candidateApi.score).toBe(10);
      expect(candidateApi.status).toBe('FAVORITE');
      expect(candidateApi.videoCvs[0].id).toBe('id');
      expect(candidateApi.videoCvs[0].imgUrl).toBe('imgUrl');
      expect(candidateApi.videoCvs[0].question).toBe('question');
      expect(candidateApi.videoCvs[0].videoUrl).toBe('videoUrl');
    });

    it('should not convert contact information when undefined', () => {
      expect(CandidateAdapter.toApi(CandidateFactory.create()).contactInformation).toBe(undefined);
      expect(CandidateAdapter.toApi(CandidateFactory.create({ contactInformation: undefined })).contactInformation).toBe(undefined);
    });
  });
});
