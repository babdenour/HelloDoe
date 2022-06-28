import { EntryPointFactory } from '@business';
import {
  AccessCardRepositoryProviderFactory,
  DoerRepositoryProviderFactory,
  EntryPointRepositoryProviderFactory,
} from '@database';
import { mockMessengerPayload } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';

import { FacebookMessenger } from './facebook-messenger';
import { MessengerPayload } from './messenger-payload';

let facebookMessenger: FacebookMessenger;

let mockFindByFacebookPageId: jest.Mock;

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      AccessCardRepositoryProviderFactory({ useValue: {} }),
      DoerRepositoryProviderFactory({ useValue: {} }),
      EntryPointRepositoryProviderFactory({
        useValue: {
          findByFacebookPageId: mockFindByFacebookPageId,
        },
      }),
      FacebookMessenger,
    ],
  }).compile();

  facebookMessenger = module.get<FacebookMessenger>(FacebookMessenger);
};

describe('FacebookMessenger', () => {
  beforeEach(async () => {
    mockFindByFacebookPageId = jest.fn().mockImplementation(() => EntryPointFactory.createFacebookEntryPoint());
    await createApp();
  });

  describe(`when init`, () => {
    describe(`if entry point not found`, () => {
      const MESSENGER_PAYLOAD: MessengerPayload = mockMessengerPayload();

      beforeEach(async () => {
        mockFindByFacebookPageId = jest.fn().mockImplementation(() => null);
        await createApp();
      });

      it(`should throw`, async () => {
        await expect(facebookMessenger.init(MESSENGER_PAYLOAD)).rejects.toThrow();
      });
    });
  });
});
