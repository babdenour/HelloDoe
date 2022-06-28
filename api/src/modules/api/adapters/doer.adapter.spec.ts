import { DoerFactory } from '@business';

import { DoerAdapter } from '../adapters/doer.adapter';
import { DoerDto } from '../dtos/doer.dto';

describe('DoerAdapter', () => {
  describe('toApi', () => {
    it('should convert doer to api object', () => {
      const doerDomain = DoerFactory.create({
        id: '1',
        profile: DoerFactory.createDoerProfile({
          address: 'address',
          birthday: 'birthday',
          city: 'city',
          country: 'country',
          department: 69, // la trik
          email: 'email',
          firstName: 'firstName',
          gender: 0,
          imgUrl: 'imgUrl',
          lastName: 'lastName',
          nationality: 'nationality',
          phone: 'phone',
          residencePermitOk: true,
        }),
        workProfile: DoerFactory.createDoerWorkProfile({
          hasCompletedFreelanceProcess: true,
          siret: 'siret',
          rating: 5,
          availabilities: {
            deadline: 0,
            timeSlots: [],
            type: 0,
          },
          location: [0, 1, 2],
          missions: ['missionId'],
        }),
      });

      const doer = DoerAdapter.toApi(doerDomain);

      expect(doer.id).toBe('1');
      expect(doer.profile.address).toBe('address');
      expect(doer.profile.birthday).toBe('birthday');
      expect(doer.profile.city).toBe('city');
      expect(doer.profile.country).toBe('country');
      expect(doer.profile.department).toBe(69);
      expect(doer.profile.email).toBe('email');
      expect(doer.profile.firstName).toBe('firstName');
      expect(doer.profile.gender).toBe(0);
      expect(doer.profile.imgUrl).toBe('imgUrl');
      expect(doer.profile.lastName).toBe('lastName');
      expect(doer.profile.nationality).toBe('nationality');
      expect(doer.profile.phone).toBe('phone');
      expect(doer.profile.residencePermitOk).toBe(true);
      expect(doer.workProfile.siret).toBe('siret');
      expect(doer.workProfile.rating).toBe(5);
      expect(doer.workProfile.location).toEqual([0, 1, 2]);
      expect(doer.workProfile.missions).toEqual(['missionId']);
    });
  });

  describe('toApiOrString', () => {
    describe('if the doer is a string', () => {
      it('should convert to string', () => {
        const doerId = '1';

        const doer = DoerAdapter.toApiOrString(doerId);

        expect(typeof doer).toBe('string');
        expect(doer).toBe(doerId);
      });
    });

    describe('if the doer is a domain object', () => {
      it('should convert to api object', () => {
        const doerDomain = DoerFactory.create();

        const doer = DoerAdapter.toApiOrString(doerDomain);

        expect(doer instanceof DoerDto).toBe(true);
      });
    });

    describe('if the doer is not a string or domain object', () => {
      it('should return null', () => {
        const doer = null;

        const conversion = DoerAdapter.toApiOrString(doer);

        expect(conversion).toBe(null);
      });
    });
  });
});
