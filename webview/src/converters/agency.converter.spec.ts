import { AgencyConverter } from '@converters/agency.converter';

describe(`AgencyConverter`, () => {
  const agencyCvtr = new AgencyConverter();

  it(`should convert with default values`, async () => {
    const agency = agencyCvtr.toDomain();

    expect(agency.createdAt).toBe(0);
    expect(agency.updatedAt).toBe(0);
    expect(agency.id).toBe(undefined);
    expect(agency.name).toBe('');
  });

  it(`should convert with specified values`, async () => {
    const agency = agencyCvtr.toDomain({
      createdAt: 1,
      updatedAt: 10,
      id: 'id',
      name: 'name',
    });

    expect(agency.createdAt).toBe(1);
    expect(agency.updatedAt).toBe(10);
    expect(agency.id).toBe('id');
    expect(agency.name).toBe('name');
  });
});
