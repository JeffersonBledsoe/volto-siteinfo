import { getSiteInfo } from './actions';
import { siteInfo } from './reducers';

const applyConfig = (config) => {
  config.addonReducers = { siteInfo, ...config.addonReducers };

  config.settings.asyncPropsExtenders = [
    ...(config.settings.asyncPropsExtenders || []),
    {
      path: '/',
      extend: (dispatchActions) => {
        const siteInfo = {
          key: 'siteInfo',
          promise: ({ store: { dispatch } }) => {
            if (!__SERVER__) {
              return;
            }
            const action = getSiteInfo();
            return dispatch(action).catch((e) => {
              // eslint-disable-next-line
              console.log('Error getting siteinfo');
            });
          },
        };
        return [...dispatchActions, siteInfo];
      },
    },
  ];

  return config;
};

export default applyConfig;
