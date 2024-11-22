import { Container } from 'inversify';
import { flow } from 'lodash';

import environmentModule from '../module/environment/enviroment.module';

import servicesModule from '../module/services/services.module';

const container = flow(environmentModule, servicesModule)(new Container());

export default container as Container;
