import { Container } from 'inversify';
import { HttpService } from '../../../application/services/http/http.service';
import { HTTP_IOC_IDS } from './ioc/http-service.ioc';

export default (container: Container): Container => {
  container.bind(HTTP_IOC_IDS.HTTP_SERVICE).to(HttpService);
  return container;
};
