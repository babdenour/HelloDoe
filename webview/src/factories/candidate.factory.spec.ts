import { CandidateStatus } from '@domains/candidate';
import { CandidateFactory } from '@factories/candidate.factory';

describe('CandidateFactory', () => {
  describe('when create', () => {
    describe('with default values', () => {
      it('should set right values', () => {
        const candidate = CandidateFactory.create();

        expect(candidate.id).toBe('');
        expect(candidate.firstName).toBe('');
        expect(candidate.lastName).toBe('');
        expect(candidate.age).toBe(0);
        expect(candidate.score).toBe(0);
        expect(candidate.isSeen).toBe(false);
        expect(candidate.status).toBe(CandidateStatus.OTHER);
        expect(candidate.appliedAt).toBe(0);
        expect(candidate.videoCvs).toEqual([]);
      });
    });

    describe('with specified values', () => {
      it('should set right values', () => {
        const candidate = CandidateFactory.create({
          id: 'id',
          firstName: 'firstName',
          lastName: 'lastName',
          age: 18,
          score: 9,
          isSeen: true,
          status: CandidateStatus.FAVORITE,
          appliedAt: 1000,
          videoCvs: [CandidateFactory.createVideoCv(), CandidateFactory.createVideoCv()],
        });

        expect(candidate.id).toBe('id');
        expect(candidate.firstName).toBe('firstName');
        expect(candidate.lastName).toBe('lastName');
        expect(candidate.age).toBe(18);
        expect(candidate.score).toBe(9);
        expect(candidate.isSeen).toBe(true);
        expect(candidate.status).toBe(CandidateStatus.FAVORITE);
        expect(candidate.appliedAt).toBe(1000);
        expect(candidate.videoCvs).toEqual([CandidateFactory.createVideoCv(), CandidateFactory.createVideoCv()]);
      });
    });
  });

  describe('when create contact information', () => {
    describe('with default values', () => {
      it('should set right values', () => {
        const contactInfo = CandidateFactory.createContactInformation();

        expect(contactInfo.email).toBe('');
        expect(contactInfo.phone).toBe('');
      });
    });

    describe('with specified values', () => {
      it('should set right values', () => {
        const contactInfo = CandidateFactory.createContactInformation({
          email: 'email',
          phone: 'phone',
        });

        expect(contactInfo.email).toBe('email');
        expect(contactInfo.phone).toBe('phone');
      });
    });
  });

  describe('when create video cv', () => {
    describe('with default values', () => {
      it('should set right values', () => {
        const videoCv = CandidateFactory.createVideoCv();

        expect(videoCv.id).toBe('');
        expect(videoCv.imgUrl).toBe('');
        expect(videoCv.question).toBe('');
        expect(videoCv.videoUrl).toBe('');
      });
    });

    describe('with specified values', () => {
      it('should set right values', () => {
        const videoCv = CandidateFactory.createVideoCv({
          id: 'id',
          imgUrl: 'imgUrl',
          question: 'question',
          videoUrl: 'videoUrl',
        });

        expect(videoCv.id).toBe('id');
        expect(videoCv.imgUrl).toBe('imgUrl');
        expect(videoCv.question).toBe('question');
        expect(videoCv.videoUrl).toBe('videoUrl');
      });
    });
  });
});
