import request from 'supertest';
import ResourceController from '../src/controllers/ResourceController';
import { app } from '../src/Handler';
import AdministrationModel from '../src/models/AdministrationsModel';

// Based on https://jestjs.io/docs/es6-class-mocks

jest.mock('../src/models/AdministrationsModel');

beforeEach(() => {
  (AdministrationModel as any).mockClear();
});

// Passes ✅
it('should call AdministrationModels constructor when the controller is initiated directly', () => {
  expect(AdministrationModel).not.toHaveBeenCalled();
  const resouceController = new ResourceController();
  expect(AdministrationModel).toHaveBeenCalledTimes(1);
});

// Fails ❌
it('should call AdministrationModels constructor when the request is made through supertest', async () => {
  expect(AdministrationModel).not.toHaveBeenCalled();
  await request(app).get('/administrations/123/invoices');
  expect(AdministrationModel).toHaveBeenCalledTimes(1);

  // Planning to mock like this...
  // AdministrationModel.mockImplementation(() => ({
  //   getById: () => ({ id: '789' }),
  // }));
});
