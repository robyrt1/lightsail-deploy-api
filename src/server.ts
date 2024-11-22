import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { InversifyExpressServer, getRouteInfo } from 'inversify-express-utils';
import { map } from 'lodash';
import morgan from 'morgan';
import 'reflect-metadata';
import { IEnvironmentShared } from './shared/application/environment/types/environment-shared.types';
import { GenericExceptionFilter } from './shared/application/http/filters/generec.exceptions.filter';
import container from './shared/infrastructure/inversify/inversify';
import { ENRIRONMENT_IOC_IDS } from './shared/infrastructure/module/environment/ioc/enrironment.ioc.identifiers';
import './shared/infrastructure/routes/index';

const app = new InversifyExpressServer(container, null, null, express());

const environmentService = container.get<IEnvironmentShared>(ENRIRONMENT_IOC_IDS.ENRIRONMENT_SERVICE);

app.setConfig((app) => {
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());
});

app.setErrorConfig((app) => {
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const genericExceptionFilter = container.resolve(GenericExceptionFilter);
    genericExceptionFilter.handleError(err, req, res, next);
  });
});

const server = app.build();
const portServer = Number(environmentService.getEnv('PORT'));
const routeInfo = getRouteInfo(container);

map(routeInfo, (enpoints) => {
  const nameController = enpoints.controller;
  map(enpoints.endpoints, (endpoint) => {
    console.log(`\x1b[34m API LOG [RouterExplorer] - ${nameController} - {${endpoint.route}}\x1b[0m`);
  });
});

const serverRun = server.listen(portServer, () => {
  const address: any = serverRun.address();
  console.log(`[INFO] - Server connection: http://${address.address}:${address.port}`);
});
