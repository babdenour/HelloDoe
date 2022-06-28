import { CandidateFactory } from './candidate.factory';

describe('CandidateFactory', () => {
  describe('create', () => {
    it('should create candidate with default values', () => {
      const candidate = CandidateFactory.create();

      expect(candidate.age).toBe(0);
      expect(candidate.appliedAt).toBe(0);
      expect(candidate.firstName).toBe(undefined);
      expect(candidate.firstName).toBe(undefined);
      expect(candidate.id).toBe(undefined);
      expect(candidate.isFavorite).toBe(undefined);
      expect(candidate.lastName).toBe(undefined);
      expect(candidate.score).toBe(undefined);
      expect(candidate.status).toBe('OTHER');
      expect(candidate.videoCvs).toEqual([]);
    });

    it('should create candidate with specified values', () => {
      const candidate = CandidateFactory.create({
        age: 23,
        appliedAt: 1000,
        firstName: 'firstName',
        id: '1',
        isFavorite: true,
        lastName: 'lastName',
        score: 10,
        status: 'FAVORITE',
        videoCvs: [CandidateFactory.createVideoCv()],
      });

      expect(candidate.age).toBe(23);
      expect(candidate.appliedAt).toBe(1000);
      expect(candidate.firstName).toBe('firstName');
      expect(candidate.id).toBe('1');
      expect(candidate.isFavorite).toBe(true);
      expect(candidate.lastName).toBe('lastName');
      expect(candidate.score).toBe(10);
      expect(candidate.status).toBe('FAVORITE');
      expect(candidate.videoCvs).toEqual([CandidateFactory.createVideoCv()]);
    });
  });

  describe('createVideoCv', () => {
    it('should create video cv with default values', () => {
      const videoCv = CandidateFactory.createVideoCv();

      expect(videoCv.id).toBe('');
      expect(videoCv.imgUrl).toBe('');
      expect(videoCv.question).toBe('');
      expect(videoCv.videoUrl).toBe('');
    });

    it('should create video cv with specified values', () => {
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

  describe('createContactInfo', () => {
    it('should create contact information with default values', () => {
      const contactInfo = CandidateFactory.createContactInfo();

      expect(contactInfo.email).toBe('');
      expect(contactInfo.phone).toBe('');
    });

    it('should create contact information with specified values', () => {
      const contactInfo = CandidateFactory.createContactInfo({
        email: 'email',
        phone: 'phone',
      });

      expect(contactInfo.email).toBe('email');
      expect(contactInfo.phone).toBe('phone');
    });
  });
});
