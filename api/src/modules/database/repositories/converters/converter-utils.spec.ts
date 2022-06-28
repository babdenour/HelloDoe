import { TestUtils } from '@mocks/test-utils';
import { Types } from 'mongoose';

import { ConverterUtils } from './converter-utils';

describe('ConverterUtils', () => {
  describe('getDate', () => {
    describe('given a timestamp', () => {
      it('should convert to date', () => {
        const timestamp = 1000;
        const date = ConverterUtils.getDate(timestamp);

        expect(date instanceof Date).toBe(true);
      });
    });

    describe('given undefined', () => {
      it('should return undefined', () => {
        const timestamp = undefined;
        const date = ConverterUtils.getDate(timestamp);

        expect(date).toBe(undefined);
      });
    });
  });

  describe('getObjectId', () => {
    describe('given a string id', () => {
      it('should convert id', () => {
        const id = TestUtils.genMongoId();

        const objectId = ConverterUtils.getObjectId(id);

        expect(objectId instanceof Types.ObjectId).toBe(true);
      });
    });

    describe('given an object with a property id', () => {
      it('should convert id', () => {
        const obj: { id: string } = {
          id: TestUtils.genMongoId(),
        };

        const objectId = ConverterUtils.getObjectId(obj);

        expect(objectId instanceof Types.ObjectId).toBe(true);
      });
    });
  });
});
