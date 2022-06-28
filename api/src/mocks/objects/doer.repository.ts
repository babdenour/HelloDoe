import { DoerRepository } from '@database';

export const mockDoerRepo = (mock?: Partial<DoerRepository>): Partial<DoerRepository> => {
  return {
    findAllByIdIn: mock?.findAllByIdIn || jest.fn(),
    findById: mock?.findById || jest.fn(),
    save: mock?.save || jest.fn(),
  };
};
