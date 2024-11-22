import { Container } from 'inversify';

import { ENRIRONMENT_IOC_IDS } from './ioc/enrironment.ioc.identifiers';

import { EnvironmentShared } from '../../../application/environment/environment.shared';
import { IEnvironmentShared } from '../../../application/environment/types/environment-shared.types';

export default (container: Container): Container => {
  container.bind<IEnvironmentShared>(ENRIRONMENT_IOC_IDS.ENRIRONMENT_SERVICE).to(EnvironmentShared);

  return container;
};
