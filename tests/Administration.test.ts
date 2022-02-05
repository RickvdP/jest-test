import request from 'supertest';
import { HttpStatus } from '../src/constants';
import ResourceController from '../src/controllers/ResourceController';
import { app } from '../src/Handler';
import AdministrationModel from '../src/models/AdministrationsModel';

// Based on https://jestjs.io/docs/es6-class-mocks

jest.mock('../src/models/AdministrationsModel');

const mockedAdministrationModel = AdministrationModel as jest.MockedClass<
  typeof AdministrationModel
>;

beforeEach(() => {
  mockedAdministrationModel.mockClear();
});

// Passes ✅
it('should call AdministrationModels constructor when the controller is initiated directly', () => {
  expect(AdministrationModel).not.toHaveBeenCalled();
  const resouceController = new ResourceController();
  expect(AdministrationModel).toHaveBeenCalledTimes(1);
});

// Fails ❌
it('should call AdministrationModels constructor when the request is made through supertest', async () => {
  const administrationObj = {
    id: '123',
  };
  const mockedGetByIdMethod = jest
    .spyOn(AdministrationModel.prototype, 'getById')
    .mockImplementationOnce(async (id: string) => administrationObj);
  const res = await request(app).get(`/administrations/${administrationObj.id}/invoices`);
  expect(mockedGetByIdMethod).toHaveBeenCalledTimes(1);
  expect(mockedGetByIdMethod).toHaveBeenCalledWith(administrationObj.id);
  expect(res.status).toEqual(HttpStatus.OK);
  expect(res.body).toMatchObject(administrationObj);
});

it('should return error when administration not found with given id', async () => {
  jest
    .spyOn(AdministrationModel.prototype, 'getById')
    .mockImplementationOnce(async (id: string) => undefined);

  const res = await request(app).get('/administrations/123/invoices');
  expect(res.status).toEqual(HttpStatus.NOT_FOUND);
  expect(res.body).toMatchObject({
    statusCode: 404,
    message: "Administration doesn't exist",
    error: 'Not Found',
  });
});
