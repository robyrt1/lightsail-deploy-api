import axios from 'axios';
import { controller, httpGet, requestParam } from 'inversify-express-utils';
import { ENPOINTS } from '../../../shared/application/constants/enpoints.constant';
import { HTTP_METHODS } from '../../../shared/application/constants/http-methods.constant';

@controller('/api/v1/users')
export class UserControllerV1 {
  @httpGet('/:id')
  async search(@requestParam('id') id: string) {
    const { data } = await axios({
      method: HTTP_METHODS.GET,
      url: ENPOINTS.USERS.url + ENPOINTS.USERS.routes.findOne.replace(':id', id),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  }
}
