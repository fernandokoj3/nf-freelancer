import { getPageableRequest } from '#/mocks';
import { PageableRequest } from '@/dto/request/base/page.base.request';
import { Category } from '@/models/category';

describe('page.base.request (...) ', () => {
  let subject: PageableRequest<Category> = null;

  beforeEach(() => {
    subject = getPageableRequest();
  });

  test('PageableRequest subject should be valid and instance base', async () => {
    expect(subject).not.toBeNull();
    expect(subject.entity).not.toBeNull();
    expect(subject.entity).toBeInstanceOf(Category);
    expect(subject.limit).not.toBeNull();
    expect(subject.order).not.toBeNull();
    expect(subject.page).not.toBeNull();
    expect(subject.sort).not.toBeNull();
  });
});
