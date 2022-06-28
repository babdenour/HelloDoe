import { CandidateApiStatus } from '@api/candidate.api';
import { CandidateConverter } from '@converters/candidate.converter';
import { CandidateStatus } from '@domains/candidate';

describe(`CandidateConverter`, () => {
  const candidateCvtr = new CandidateConverter();

  it(`should convert with default values`, async () => {
    const candidate = candidateCvtr.toDomain();

    expect(candidate.id).toBe('');
    expect(candidate.firstName).toBe('');
    expect(candidate.lastName).toBe('');
    expect(candidate.score).toBe(0);
    expect(candidate.videoCvs).toEqual([]);
    expect(candidate.isFavorite).toBe(false);
    expect(candidate.isSeen).toBe(false);
    expect(candidate.status).toBe(CandidateStatus.OTHER);
    expect(candidate.appliedAt).toBe(0);
  });

  it(`should convert with specified values`, async () => {
    const candidate = candidateCvtr.toDomain({
      id: 'id',
      firstName: 'firstName',
      lastName: 'lastName',
      age: 23,
      score: 10,
      videoCvs: [
        {
          id: 'id-1',
          imgUrl: 'imgUrl-1',
          question: 'question-1',
          videoUrl: 'videoUrl-1',
        },
        {
          id: 'id-2',
          imgUrl: 'imgUrl-2',
          question: 'question-2',
          videoUrl: 'videoUrl-2',
        },
      ],
      isFavorite: true,
      isSeen: true,
      status: CandidateApiStatus.FAVORITE,
      appliedAt: 1000,
    });

    expect(candidate.id).toBe('id');
    expect(candidate.firstName).toBe('firstName');
    expect(candidate.lastName).toBe('lastName');
    expect(candidate.age).toBe(23);
    expect(candidate.score).toBe(10);
    expect(candidate.videoCvs[0].id).toBe('id-1');
    expect(candidate.videoCvs[0].imgUrl).toBe('imgUrl-1');
    expect(candidate.videoCvs[0].question).toBe('question-1');
    expect(candidate.videoCvs[0].videoUrl).toBe('videoUrl-1');
    expect(candidate.videoCvs[1].id).toBe('id-2');
    expect(candidate.videoCvs[1].imgUrl).toBe('imgUrl-2');
    expect(candidate.videoCvs[1].question).toBe('question-2');
    expect(candidate.videoCvs[1].videoUrl).toBe('videoUrl-2');
    expect(candidate.isFavorite).toBe(true);
    expect(candidate.isSeen).toBe(true);
    expect(candidate.status).toBe(CandidateStatus.FAVORITE);
    expect(candidate.appliedAt).toBe(1000);
  });
});
