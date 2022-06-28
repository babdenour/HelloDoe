import { QuizzSheetImpl } from '@business/domains/quizz/quizz-sheet.impl';
import { ConfigModule } from '@config';
import { DoerRepositoryProviderFactory, QuizzRepository, QuizzRepositoryProviderFactory, QuizzSheetRepositoryProviderFactory } from '@database';
import { mockDoerRepo, mockQuizzRepo, mockQuizzSheetRepo, TestUtils } from '@mocks';
import { Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { ServiceNames } from '../constants/service-names';
import { CandidateImpl } from '../domains/candidate.impl';
import { BusinessError, BusinessErrorCode } from '../errors/business.error';
import { DoerFactory } from '../factories/doer.factory';
import { QuizzSheetFactory } from '../factories/quizz-sheet.factory';
import { QuizzFactory } from '../factories/quizz.factory';
import { DoerRepository } from '../repositories/doer.repository';
import { QuizzSheetRepository } from '../repositories/quizz-sheet.repository';
import { CandidateService, CandidateServiceProviderFactory } from './candidate.service';

let candidateSvc: CandidateService;

let mockedDoerRepo: Partial<DoerRepository>;
let mockedQuizzRepo: Partial<QuizzRepository>;
let mockedQuizzSheetRepo: Partial<QuizzSheetRepository>;

const candidateSvcProvider: Provider = CandidateServiceProviderFactory();

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [ConfigModule],
    providers: [
      DoerRepositoryProviderFactory({
        useValue: mockedDoerRepo,
      }),
      QuizzRepositoryProviderFactory({
        useValue: mockedQuizzRepo,
      }),
      QuizzSheetRepositoryProviderFactory({
        useValue: mockedQuizzSheetRepo,
      }),
      candidateSvcProvider,
    ],
    exports: [candidateSvcProvider],
  }).compile();

  candidateSvc = module.get<CandidateService>(ServiceNames.CANDIDATE);
};

describe('CandidateService', () => {
  beforeEach(async () => {
    mockedDoerRepo = mockDoerRepo();
    mockedQuizzRepo = mockQuizzRepo();
    mockedQuizzSheetRepo = mockQuizzSheetRepo();

    await createApp();
  });

  describe('when add to favorite for mission', () => {
    const MISSION_ID: string = TestUtils.genMongoId();
    const QUIZZ_ID: string = TestUtils.genMongoId();
    const CANDIDATE_ID: string = TestUtils.genMongoId();

    beforeEach(async () => {
      mockedQuizzRepo.findByMissionId = jest.fn().mockResolvedValue(QuizzFactory.create({ id: QUIZZ_ID }));
      mockedQuizzSheetRepo.findByQuizzIdAndDoerId = jest.fn().mockResolvedValue(QuizzSheetFactory.create());
      await createApp();
    });

    it('should call remove mission favorite doer with right information', async () => {
      await candidateSvc.addToFavoriteForMission(MISSION_ID, CANDIDATE_ID);

      expect(mockedQuizzSheetRepo.updateIsFavoriteByQuizzIdAndDoerId).toHaveBeenCalledWith(QUIZZ_ID, CANDIDATE_ID, true);
    });

    describe('when already unlocked', () => {
      beforeEach(async () => {
        mockedQuizzSheetRepo.findByQuizzIdAndDoerId = jest.fn().mockResolvedValue(QuizzSheetFactory.create({ isUnlocked: true }));
        await createApp();
      });

      it('should throw business error H00011', async () => {
        expect.assertions(3);

        try {
          await candidateSvc.addToFavoriteForMission(MISSION_ID, CANDIDATE_ID);
        } catch (ex) {
          if (ex instanceof BusinessError) {
            expect(ex.code).toBe(BusinessErrorCode.H00011_DOER_ALREADY_UNLOCKED);
            expect(ex.message).toContain(CANDIDATE_ID);
            expect(ex.message).toContain(MISSION_ID);
          }
        }
      });
    });
  });

  describe('when remove doer from favorite for mission', () => {
    const MISSION_ID: string = TestUtils.genMongoId();
    const QUIZZ_ID: string = TestUtils.genMongoId();
    const CANDIDATE_ID: string = TestUtils.genMongoId();

    beforeEach(async () => {
      mockedQuizzRepo.findByMissionId = jest.fn().mockResolvedValue(QuizzFactory.create({ id: QUIZZ_ID }));
      await createApp();
    });

    it('should call remove mission favorite doer with right information', async () => {
      await candidateSvc.removeFromFavoriteForMission(MISSION_ID, CANDIDATE_ID);

      expect(mockedQuizzSheetRepo.updateIsFavoriteByQuizzIdAndDoerId).toHaveBeenCalledWith(QUIZZ_ID, CANDIDATE_ID, false);
    });
  });

  describe('when set candidate as seen ', () => {
    const MISSION_ID: string = TestUtils.genMongoId();
    const QUIZZ_ID: string = TestUtils.genMongoId();
    const CANDIDATE_ID: string = TestUtils.genMongoId();

    beforeEach(async () => {
      mockedQuizzRepo.findByMissionId = jest.fn().mockResolvedValue(QuizzFactory.create({ id: QUIZZ_ID }));
      await createApp();
    });

    it('should set candidate as seen with right information', async () => {
      await candidateSvc.setCandidateSeenForMission(MISSION_ID, CANDIDATE_ID);

      expect(mockedQuizzSheetRepo.updateIsSeenByQuizzIdAndDoerId).toHaveBeenCalledWith(QUIZZ_ID, CANDIDATE_ID, true);
    });
  });

  describe('when get favorite count for mission', () => {
    const MISSION_ID: string = TestUtils.genMongoId();
    const QUIZZ_ID: string = TestUtils.genMongoId();

    beforeEach(async () => {
      mockedQuizzRepo.findByMissionId = jest.fn().mockResolvedValue(QuizzFactory.create({ id: QUIZZ_ID }));
      await createApp();
    });

    it('should pass on right parameters', async () => {
      await candidateSvc.getFavoriteCountForMission(MISSION_ID);

      expect(mockedQuizzSheetRepo.countFavoriteByQuizzId).toHaveBeenCalledWith(QUIZZ_ID);
    });
  });

  describe('when find candidates paginated for mission', () => {
    const MISSION_ID: string = TestUtils.genMongoId();
    const QUIZZ_ID: string = TestUtils.genMongoId();
    const CANDIDATE_ID_1: string = TestUtils.genMongoId();
    const CANDIDATE_ID_2: string = TestUtils.genMongoId();
    const CANDIDATE_ID_3: string = TestUtils.genMongoId();

    const CANDIDATE_AGE_1: number = 21;
    const CANDIDATE_AGE_2: number = 22;
    const CANDIDATE_AGE_3: number = 23;

    const APPLICATIONS: QuizzSheetImpl[] = [
      QuizzSheetFactory.create({ doer: CANDIDATE_ID_3, score: 10, isFavorite: true, completedAt: 1003, isSeen: true }),
      QuizzSheetFactory.create({ doer: CANDIDATE_ID_2, score: 9, isFavorite: false, isUnlocked: true, completedAt: 1002, isSeen: false }),
      QuizzSheetFactory.create({ doer: CANDIDATE_ID_1, score: 8, isFavorite: false, completedAt: 1001, isSeen: false }),
    ];

    const PAGE_INDEX: number = 0;
    const PAGE_SIZE: number = 10;

    beforeEach(async () => {
      mockedQuizzRepo.findByMissionId = jest.fn().mockImplementation(() => QuizzFactory.create({ id: QUIZZ_ID }));

      mockedQuizzSheetRepo.findAllSortedByIsUnlockedDescAndScoreDescGreaterThanWithPagination = jest.fn().mockImplementation(() => APPLICATIONS);

      mockedDoerRepo.findAllByIdIn = jest.fn().mockImplementation(() => [
        DoerFactory.create({
          id: CANDIDATE_ID_2,
          profile: DoerFactory.createDoerProfile({
            firstName: 'Jane',
            lastName: 'Doe',
            birthday: TestUtils.formatBirthdayDate(CANDIDATE_AGE_2),
          }),
          workProfile: DoerFactory.createDoerWorkProfile({
            videoCvs: [
              DoerFactory.createVideoCv({
                id: 'id:Jane',
                imgUrl: 'img:Jane',
                question: 'question:Jane',
                videoUrl: 'video:Jane',
              }),
            ],
          }),
        }),
        DoerFactory.create({
          id: CANDIDATE_ID_1,
          profile: DoerFactory.createDoerProfile({
            firstName: 'John',
            lastName: 'Rachid',
            birthday: TestUtils.formatBirthdayDate(CANDIDATE_AGE_1),
          }),
          workProfile: DoerFactory.createDoerWorkProfile({
            videoCvs: [
              DoerFactory.createVideoCv({
                id: 'id:John',
                imgUrl: 'img:John',
                question: 'question:John',
                videoUrl: 'video:John',
              }),
            ],
          }),
        }),
        DoerFactory.create({
          id: CANDIDATE_ID_3,
          profile: DoerFactory.createDoerProfile({
            firstName: 'Play',
            lastName: 'Doe',
            birthday: TestUtils.formatBirthdayDate(CANDIDATE_AGE_3),
          }),
          workProfile: DoerFactory.createDoerWorkProfile({
            videoCvs: [
              DoerFactory.createVideoCv({
                id: 'id:Play',
                imgUrl: 'img:Play',
                question: 'question:Play',
                videoUrl: 'video:Play',
              }),
            ],
          }),
        }),
      ]);

      await createApp();
    });

    it('should find candidates', async () => {
      const candidates: CandidateImpl[] = await candidateSvc.findPaginatedForMission(MISSION_ID, PAGE_INDEX, PAGE_SIZE);

      expect(candidates.length).toBe(3);
      expect(candidates[0].id).toBe(CANDIDATE_ID_3);
      expect(candidates[0].firstName).toBe('Play');
      expect(candidates[0].lastName).toBe('Doe');
      expect(candidates[0].age).toBe(CANDIDATE_AGE_3);
      expect(candidates[0].appliedAt).toBe(1003);
      expect(candidates[0].score).toBe(10);
      expect(candidates[0].status).toBe('FAVORITE');
      expect(candidates[0].videoCvs[0].id).toBe('id:Play');
      expect(candidates[0].videoCvs[0].imgUrl).toBe('img:Play');
      expect(candidates[0].videoCvs[0].question).toBe('question:Play');
      expect(candidates[0].videoCvs[0].videoUrl).toBe('video:Play');
      expect(candidates[0].isFavorite).toBe(true);
      expect(candidates[0].isSeen).toBe(true);
      expect(candidates[1].id).toBe(CANDIDATE_ID_2);
      expect(candidates[1].firstName).toBe('Jane');
      expect(candidates[1].lastName).toBe('Doe');
      expect(candidates[1].age).toBe(CANDIDATE_AGE_2);
      expect(candidates[1].appliedAt).toBe(1002);
      expect(candidates[1].score).toBe(9);
      expect(candidates[1].status).toBe('UNLOCKED');
      expect(candidates[1].videoCvs[0].id).toBe('id:Jane');
      expect(candidates[1].videoCvs[0].imgUrl).toBe('img:Jane');
      expect(candidates[1].videoCvs[0].question).toBe('question:Jane');
      expect(candidates[1].videoCvs[0].videoUrl).toBe('video:Jane');
      expect(candidates[1].isFavorite).toBe(false);
      expect(candidates[1].isSeen).toBe(false);
      expect(candidates[2].id).toBe(CANDIDATE_ID_1);
      expect(candidates[2].firstName).toBe('John');
      expect(candidates[2].lastName).toBe('Rachid');
      expect(candidates[2].age).toBe(CANDIDATE_AGE_1);
      expect(candidates[2].appliedAt).toBe(1001);
      expect(candidates[2].score).toBe(8);
      expect(candidates[2].status).toBe('PRESELECTED');
      expect(candidates[2].videoCvs[0].id).toBe('id:John');
      expect(candidates[2].videoCvs[0].imgUrl).toBe('img:John');
      expect(candidates[2].videoCvs[0].question).toBe('question:John');
      expect(candidates[2].videoCvs[0].videoUrl).toBe('video:John');
      expect(candidates[2].isFavorite).toBe(false);
      expect(candidates[2].isSeen).toBe(false);
    });

    it('should preserve applications ordering', async () => {
      const candidates: CandidateImpl[] = await candidateSvc.findPaginatedForMission(MISSION_ID, PAGE_INDEX, PAGE_SIZE);

      candidates.forEach((candidate: CandidateImpl, idx: number) => {
        expect(candidate.id).toBe(APPLICATIONS[idx].doer);
      });
    });
  });

  describe('when find one candidate for mission', () => {
    const MISSION_ID: string = TestUtils.genMongoId();
    const QUIZZ_ID: string = TestUtils.genMongoId();
    const CANDIDATE_ID: string = TestUtils.genMongoId();

    beforeEach(async () => {
      mockedQuizzRepo.findByMissionId = jest.fn().mockImplementation(() => QuizzFactory.create({ id: QUIZZ_ID }));

      mockedQuizzSheetRepo.findByQuizzIdAndDoerId = jest
        .fn()
        .mockImplementation(() => QuizzSheetFactory.create({ doer: CANDIDATE_ID, score: 8, isFavorite: true, completedAt: 1000, isSeen: true }));

      mockedDoerRepo.findById = jest.fn().mockImplementation(() =>
        DoerFactory.create({
          id: CANDIDATE_ID,
          profile: DoerFactory.createDoerProfile({
            firstName: 'John',
            lastName: 'Rachid',
            birthday: TestUtils.formatBirthdayDate(20),
          }),
          workProfile: DoerFactory.createDoerWorkProfile({
            videoCvs: [
              DoerFactory.createVideoCv({
                imgUrl: 'img:John-1',
                videoUrl: 'video:John-1',
              }),
              DoerFactory.createVideoCv({
                imgUrl: 'img:John-2',
                videoUrl: 'video:John-2',
              }),
            ],
          }),
        }),
      );

      await createApp();
    });

    it('should find one candidate', async () => {
      const candidates: CandidateImpl = await candidateSvc.findOneForMission(MISSION_ID, CANDIDATE_ID);

      expect(candidates.id).toBe(CANDIDATE_ID);
      expect(candidates.firstName).toBe('John');
      expect(candidates.lastName).toBe('Rachid');
      expect(candidates.age).toBe(20);
      expect(candidates.appliedAt).toBe(1000);
      expect(candidates.score).toBe(8);
      expect(candidates.status).toBe('FAVORITE');
      expect(candidates.videoCvs[0].imgUrl).toBe('img:John-1');
      expect(candidates.videoCvs[0].videoUrl).toBe('video:John-1');
      expect(candidates.videoCvs[1].imgUrl).toBe('img:John-2');
      expect(candidates.videoCvs[1].videoUrl).toBe('video:John-2');
      expect(candidates.isFavorite).toBe(true);
      expect(candidates.isSeen).toBe(true);
    });
  });
});
