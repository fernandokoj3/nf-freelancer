import { validateObject } from '@/middlewares/schema.validation';
import { getAuthRequest } from '#/mocks';
import { AuthRequest } from '@/dto/request/auth.request';

describe('auth.request (...)', () => {
  describe('AuthRequest (...) ', () => {
    let subject: AuthRequest = null;

    beforeEach(() => {
      subject = getAuthRequest();
    });

    test('AuthRequest subject should be valid', async () => {
      const { data, error } = await validateObject(subject, AuthRequest);
      expect(error).toBeUndefined();
      expect(data).toBeInstanceOf(AuthRequest);
      expect(data).toEqual(subject);
    });
  });
});
