import {API} from '@helpers';
import {API_ENDPOINTS} from '@config';

export function login(data: any, accessToken: string) {
  return API.request({
    method: 'post',
    url: `${API_ENDPOINTS.LOGIN}/?access_token=${accessToken}`,
    data,
  });
}
