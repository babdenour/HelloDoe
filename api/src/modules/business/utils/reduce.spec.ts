import { reduce } from './reduce';

interface UserTest {
  id: string;
  name: string;
  admin: boolean;
}

describe('reduce', () => {
  describe('when reduce', () => {
    it('should associate right object to right key', () => {
      const user1: UserTest = { id: '1', name: 'name1', admin: false };
      const user2: UserTest = { id: '2', name: 'name2', admin: false };
      const user3: UserTest = { id: '3', name: 'name3', admin: false };
      const objs: UserTest[] = [user1, user2, user3];

      const reduced: Map<string, UserTest> = reduce(objs, 'id');

      expect(reduced.get('1')).toBe(user1);
      expect(reduced.get('2')).toBe(user2);
      expect(reduced.get('3')).toBe(user3);
    });
  });
});
