import Router from 'express-promise-router';
import {
  NextFunction, Request, Response,
} from 'express';
import AdministrationModel from '../models/AdministrationsModel';

class ResourceController {
  public router = Router({ mergeParams: true });

  // public AdministrationsModel: AdministrationModel = new AdministrationModel();
  public AdministrationsModel: AdministrationModel;

  constructor() {
    this.AdministrationsModel = new AdministrationModel();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.use('*', (req, res, next) => this.handler(req, res, next));
  }

  private async handler(req: Request, res: Response, next: NextFunction): Promise<object> {
    const administrationId = req.params.id;
    console.log('adminId:', administrationId);
    const administration = await this.AdministrationsModel.getById(administrationId);
    // const administration = null;

    console.log('received getById response', administration);
    if (!administration) {
      throw new Error('Administration doesn\'t exist');
    }

    return res.json(administration);
  }
}

export default ResourceController;
