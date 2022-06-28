import { QuizzSheetFactory, QuizzSheetImplBusiness } from '@business';
import { cleanDatabase, getConnection, TestUtils } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';

import { RepositoryNames } from '../constants/repository-names';
import { DatabaseModule } from '../database.module';
import { QuizzSheetRepositoryImpl } from './quizz-sheet.repository.impl';

describe('QuizzSheetRepositoryImpl', () => {
  let quizzSheetRepo: QuizzSheetRepositoryImpl;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile();

    connection = getConnection(module);
    quizzSheetRepo = module.get<QuizzSheetRepositoryImpl>(RepositoryNames.QUIZZ_SHEET);
  });

  afterEach(async () => {
    await cleanDatabase(connection);
  });

  describe('when count favorite by quizz id', () => {
    const QUIZZ_ID: string = TestUtils.genMongoId();
    const QUIZZ_ID_OTHER: string = TestUtils.genMongoId();

    beforeEach(async () => {
      await Promise.all([
        quizzSheetRepo.save(QuizzSheetFactory.create({ quizz: QUIZZ_ID, isFavorite: true })),
        quizzSheetRepo.save(QuizzSheetFactory.create({ quizz: QUIZZ_ID, isFavorite: true })),
        quizzSheetRepo.save(QuizzSheetFactory.create({ quizz: QUIZZ_ID, isFavorite: false })),
        quizzSheetRepo.save(QuizzSheetFactory.create({ quizz: QUIZZ_ID_OTHER, isFavorite: true })),
      ]);
    });

    it('should count', async () => {
      const count: number = await quizzSheetRepo.countFavoriteByQuizzId(QUIZZ_ID);

      expect(count).toBe(2);
    });
  });

  describe('when find all by quizz id and is favorite', () => {
    const QUIZZ_ID: string = TestUtils.genMongoId();
    const QUIZZ_ID_OTHER: string = TestUtils.genMongoId();
    const DOER_ID_0: string = TestUtils.genMongoId();
    const DOER_ID_1: string = TestUtils.genMongoId();
    const DOER_ID_2: string = TestUtils.genMongoId();
    const DOER_ID_3: string = TestUtils.genMongoId();
    const IS_FAVORITE: boolean = true;

    beforeEach(async () => {
      await quizzSheetRepo.save(QuizzSheetFactory.create({ quizz: QUIZZ_ID, doer: DOER_ID_0, isFavorite: true }));
      await quizzSheetRepo.save(QuizzSheetFactory.create({ quizz: QUIZZ_ID, doer: DOER_ID_1, isFavorite: true }));
      await quizzSheetRepo.save(QuizzSheetFactory.create({ quizz: QUIZZ_ID, doer: DOER_ID_2, isFavorite: false }));
      await quizzSheetRepo.save(QuizzSheetFactory.create({ quizz: QUIZZ_ID_OTHER, doer: DOER_ID_3, isFavorite: true }));
    });

    it('should find', async () => {
      const sheets: QuizzSheetImplBusiness[] = await quizzSheetRepo.findAllByQuizzIdAndIsFavorite(QUIZZ_ID, IS_FAVORITE);

      expect(sheets.length).toBe(2);
    });
  });

  describe('when find quizz sheet by doer id and quizz id or create', () => {
    const DOER_ID: string = TestUtils.genMongoId();
    const QUIZZ_ID: string = TestUtils.genMongoId();

    describe('if exists', () => {
      beforeEach(async () => {
        await quizzSheetRepo.save(QuizzSheetFactory.create({ doer: DOER_ID, quizz: QUIZZ_ID }));
      });

      it('should find', async () => {
        const quizzSheet: QuizzSheetImplBusiness = await quizzSheetRepo.findByDoerIdAndQuizzIdOrCreate(DOER_ID, QUIZZ_ID);

        const quizzSheets: QuizzSheetImplBusiness[] = await quizzSheetRepo.findAll();
        expect(quizzSheet.doer).toBe(DOER_ID);
        expect(quizzSheet.quizz).toBe(QUIZZ_ID);
        expect(quizzSheets.length).toBe(1);
      });
    });

    describe('if does not exist', () => {
      it('should create', async () => {
        const quizzSheet: QuizzSheetImplBusiness = await quizzSheetRepo.findByDoerIdAndQuizzIdOrCreate(DOER_ID, QUIZZ_ID);

        const quizzSheets: QuizzSheetImplBusiness[] = await quizzSheetRepo.findAll();
        expect(quizzSheet.doer).toBe(DOER_ID);
        expect(quizzSheet.quizz).toBe(QUIZZ_ID);
        expect(quizzSheets.length).toBe(1);
      });
    });
  });

  describe('when find all quizz sheets sorted by is unlocked desc and score desc greater than with pagination', () => {
    const QUIZZ_ID: string = TestUtils.genMongoId();
    const QUIZZ_ID_OTHER: string = TestUtils.genMongoId();

    const DOER_ID_0: string = TestUtils.genMongoId();
    const DOER_ID_1: string = TestUtils.genMongoId();
    const DOER_ID_2: string = TestUtils.genMongoId();
    const DOER_ID_3: string = TestUtils.genMongoId();
    const DOER_ID_4: string = TestUtils.genMongoId();

    beforeEach(async () => {
      await quizzSheetRepo.save(QuizzSheetFactory.create({ doer: DOER_ID_0, score: 7, quizz: QUIZZ_ID }));
      await quizzSheetRepo.save(QuizzSheetFactory.create({ doer: DOER_ID_1, score: 8, quizz: QUIZZ_ID, isUnlocked: true }));
      await quizzSheetRepo.save(QuizzSheetFactory.create({ doer: DOER_ID_2, score: 10, quizz: QUIZZ_ID, completedAt: 1000 }));
      await quizzSheetRepo.save(QuizzSheetFactory.create({ score: 9, quizz: QUIZZ_ID_OTHER }));
      await quizzSheetRepo.save(QuizzSheetFactory.create({ doer: DOER_ID_3, score: 9, quizz: QUIZZ_ID, isFavorite: true }));
      await quizzSheetRepo.save(QuizzSheetFactory.create({ doer: DOER_ID_4, score: 10, quizz: QUIZZ_ID, completedAt: 2000 }));
    });

    it('should sort correctly', async () => {
      const PAGE_INDEX: number = 0;
      const PAGE_SIZE: number = 10;

      const quizzShts: QuizzSheetImplBusiness[] = await quizzSheetRepo.findAllSortedByIsUnlockedDescAndScoreDescGreaterThanWithPagination(QUIZZ_ID, PAGE_INDEX, PAGE_SIZE);

      expect(quizzShts[0].doer).toBe(DOER_ID_1);
      expect(quizzShts[1].doer).toBe(DOER_ID_3);
      expect(quizzShts[2].doer).toBe(DOER_ID_2);
      expect(quizzShts[3].doer).toBe(DOER_ID_4);
      expect(quizzShts[4].doer).toBe(DOER_ID_0);
    });

    it('should limit results count to page size', async () => {
      const PAGE_INDEX: number = 0;
      const PAGE_SIZE: number = 1;

      const quizzShts: QuizzSheetImplBusiness[] = await quizzSheetRepo.findAllSortedByIsUnlockedDescAndScoreDescGreaterThanWithPagination(QUIZZ_ID, PAGE_INDEX, PAGE_SIZE);

      expect(quizzShts.length).toBe(PAGE_SIZE);
    });

    it('should return results of requested page', async () => {
      const PAGE_INDEX: number = 1;
      const PAGE_SIZE: number = 1;

      const quizzShts: QuizzSheetImplBusiness[] = await quizzSheetRepo.findAllSortedByIsUnlockedDescAndScoreDescGreaterThanWithPagination(QUIZZ_ID, PAGE_INDEX, PAGE_SIZE);

      expect(quizzShts[0].doer).toBe(DOER_ID_3);
    });
  });

  describe('when update all is favorite by quizz id and doer id in', () => {
    const QUIZZ_ID: string = TestUtils.genMongoId();
    const DOER_ID_0: string = TestUtils.genMongoId();
    const DOER_ID_1: string = TestUtils.genMongoId();
    const IS_FAVORITE: boolean = true;

    beforeEach(async () => {
      await Promise.all([
        quizzSheetRepo.save(QuizzSheetFactory.create({ quizz: QUIZZ_ID, doer: DOER_ID_0, isFavorite: !IS_FAVORITE })),
        quizzSheetRepo.save(QuizzSheetFactory.create({ quizz: QUIZZ_ID, doer: DOER_ID_1, isFavorite: !IS_FAVORITE })),
      ]);
    });

    it('should update', async () => {
      await quizzSheetRepo.updateAllIsFavoriteByQuizzIdAndDoerIdIn(QUIZZ_ID, [DOER_ID_0, DOER_ID_1], IS_FAVORITE);

      const sheets: QuizzSheetImplBusiness[] = await quizzSheetRepo.findAll();
      expect(sheets[0].isFavorite).toBe(IS_FAVORITE);
      expect(sheets[1].isFavorite).toBe(IS_FAVORITE);
    });
  });

  describe('when update all is unlocked by quizz id and doer id in', () => {
    const QUIZZ_ID: string = TestUtils.genMongoId();
    const DOER_ID_0: string = TestUtils.genMongoId();
    const DOER_ID_1: string = TestUtils.genMongoId();
    const IS_UNLOCKED: boolean = true;

    beforeEach(async () => {
      await Promise.all([
        quizzSheetRepo.save(QuizzSheetFactory.create({ quizz: QUIZZ_ID, doer: DOER_ID_0, isUnlocked: !IS_UNLOCKED })),
        quizzSheetRepo.save(QuizzSheetFactory.create({ quizz: QUIZZ_ID, doer: DOER_ID_1, isUnlocked: !IS_UNLOCKED })),
      ]);
    });

    it('should update', async () => {
      await quizzSheetRepo.updateAllIsUnlockedByQuizzIdAndDoerIdIn(QUIZZ_ID, [DOER_ID_0, DOER_ID_1], IS_UNLOCKED);

      const sheets: QuizzSheetImplBusiness[] = await quizzSheetRepo.findAll();
      expect(sheets[0].isUnlocked).toBe(IS_UNLOCKED);
      expect(sheets[1].isUnlocked).toBe(IS_UNLOCKED);
    });
  });

  describe('when update is favorite by quizz id and doer id', () => {
    const QUIZZ_ID: string = TestUtils.genMongoId();
    const DOER_ID: string = TestUtils.genMongoId();
    const IS_FAVORITE: boolean = true;

    beforeEach(async () => {
      await quizzSheetRepo.save(QuizzSheetFactory.create({ quizz: QUIZZ_ID, doer: DOER_ID, isFavorite: !IS_FAVORITE }));
    });

    it('should update', async () => {
      await quizzSheetRepo.updateIsFavoriteByQuizzIdAndDoerId(QUIZZ_ID, DOER_ID, IS_FAVORITE);

      const sheet: QuizzSheetImplBusiness = await quizzSheetRepo.findByQuizzIdAndDoerId(QUIZZ_ID, DOER_ID);
      expect(sheet.isFavorite).toBe(IS_FAVORITE);
    });
  });

  describe('when update is seen by quizz id and doer id', () => {
    const QUIZZ_ID: string = TestUtils.genMongoId();
    const DOER_ID: string = TestUtils.genMongoId();
    const IS_SEEN: boolean = true;

    beforeEach(async () => {
      await quizzSheetRepo.save(QuizzSheetFactory.create({ quizz: QUIZZ_ID, doer: DOER_ID, isSeen: !IS_SEEN }));
    });

    it('should update', async () => {
      await quizzSheetRepo.updateIsSeenByQuizzIdAndDoerId(QUIZZ_ID, DOER_ID, IS_SEEN);

      const sheet: QuizzSheetImplBusiness = await quizzSheetRepo.findByQuizzIdAndDoerId(QUIZZ_ID, DOER_ID);
      expect(sheet.isSeen).toBe(IS_SEEN);
    });
  });
});
