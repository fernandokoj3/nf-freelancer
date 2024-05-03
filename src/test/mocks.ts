import { Region } from '@/domain/region';
import { faker } from '@faker-js/faker';
import { AuthRequest } from '@/dto/request/auth.request';
import {
  PageBaseRequest,
  PageableRequest,
} from '@/dto/request/base/page.base.request';
import { Category } from '@/models/category';
import { CategoryOrder, CategoryRequest } from '@/dto/request/category.request';
import { plainToInstance } from 'class-transformer';

//regiao5: randomEnum(Region),
const randomEnum = ($enum: any) => {
  let values = Object.keys($enum);
  let key = values[Math.floor(Math.random() * values.length)];
  return $enum[key];
};

export const getAuthRequest = (): AuthRequest => {
  return {
    login: faker.internet.email(),
    password: faker.internet.password(),
  };
};

export const getCategoryRequest = (): CategoryRequest => {
  return {
    name: faker.name.firstName(),
    limit: faker.datatype.number({ min: 10, max: 100 }),
    order: randomEnum(CategoryOrder),
    page: faker.datatype.number({ min: 1, max: 9999 }),
    sort: randomEnum(['ASC', 'DESC', 'asc', 'desc']),
  } as CategoryRequest;
};

export const getPageableRequest = (): PageableRequest<Category> => {
  const category = getCategoryRequest();
  return PageBaseRequest.get(category, Category);
};

export const getCategoryListResult = () => {
  const result = [
    plainToInstance(Category, {
      id: faker.datatype.number(),
      name: faker.name.firstName(),
      description: faker.lorem.text(),
    }),
    plainToInstance(Category, {
      id: faker.datatype.number(),
      name: faker.name.firstName(),
      description: faker.lorem.text(),
    }),
    plainToInstance(Category, {
      id: faker.datatype.number(),
      name: faker.name.firstName(),
      description: faker.lorem.text(),
    }),
    plainToInstance(Category, {
      id: faker.datatype.number(),
      name: faker.name.firstName(),
      description: faker.lorem.text(),
    }),
    plainToInstance(Category, {
      id: faker.datatype.number(),
      name: faker.name.firstName(),
      description: faker.lorem.text(),
    }),
    plainToInstance(Category, {
      id: faker.datatype.number(),
      name: faker.name.firstName(),
      description: faker.lorem.text(),
    }),
  ];
  return {
    total: result.length,
    result,
  };
};
