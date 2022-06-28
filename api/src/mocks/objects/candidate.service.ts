import { CandidateService } from '@business';

export const mockCandidateSvc = (mock?: Partial<CandidateService>): Partial<CandidateService> => {
  return {
    addToFavoriteForMission: mock?.addToFavoriteForMission || jest.fn(),
    findOneForMission: mock?.findOneForMission || jest.fn(),
    findPaginatedForMission: mock?.findPaginatedForMission || jest.fn(),
    getFavoriteCountForMission: mock?.getFavoriteCountForMission || jest.fn(),
    removeFromFavoriteForMission: mock?.removeFromFavoriteForMission || jest.fn(),
    setCandidateSeenForMission: mock?.setCandidateSeenForMission || jest.fn(),
  };
};
