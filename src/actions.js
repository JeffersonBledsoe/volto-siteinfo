import { GET_SITEINFO } from './constants';

export function getSiteInfo() {
  // TODO: This probably doesn't support i18n due to the different navigation root
  return {
    type: GET_SITEINFO,
    request: {
      op: 'get',
      path: `/@siteinfo`,
    },
  };
}
