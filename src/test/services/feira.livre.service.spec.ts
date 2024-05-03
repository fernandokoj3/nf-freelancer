import { getCategoryListResult, getCategoryRequest } from '#/mocks';
import { CategoryRepository } from '@/repository/categopry.repository';
import { CategoryService } from '@/services/v1/category.service';

describe('category.service (...)', () => {
  const categoryRepository: Partial<CategoryRepository> = {};
  let categoryListRequest = null;
  let categoryMergeRequest = null;
  let categoryCreateRequest = null;

  const subject: CategoryService = new CategoryService(
    categoryRepository as unknown as any,
  );

  beforeEach(async () => {
    categoryListRequest = getCategoryRequest();
  });

  describe('list (...)', () => {
    test('list should be not null', async () => {
      categoryRepository.page = jest.fn(async () => {
        return getCategoryListResult();
      });

      let result = await subject.list(categoryListRequest);
      expect(result).not.toBeNull();
      expect(result.meta).not.toBeNull();
      expect(result.meta.has_next_page).not.toBeNull();
      expect(result.meta.has_previous_page).not.toBeNull();
      expect(result.meta.limit).not.toBeNull();
      expect(result.meta.order_by).not.toBeNull();
      expect(result.meta.page).not.toBeNull();
      expect(result.meta.total_items).not.toBeNull();
      expect(result.meta.total_items_page).not.toBeNull();
      expect(result.meta.total_pages).not.toBeNull();
      expect(result.content).not.toBeNull();
      expect(result.content.length).toBeGreaterThan(1);
    });
  });
});
