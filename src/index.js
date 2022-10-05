import { getBaseUrl } from '@plone/volto/helpers';

import { getSiteInfo } from './actions';
import { siteInfo } from './reducers';

const applyConfig = (config) => {
  config.addonReducers = { siteInfo, ...config.addonReducers };

  config.settings.asyncPropsExtenders = [
    ...(config.settings.asyncPropsExtenders ?? []),
    {
      path: '/',
      extend: (dispatchActions) => {
        if (
          dispatchActions.filter(
            (asyncAction) => asyncAction.key === 'siteInfo',
          ).length === 0
        ) {
          dispatchActions.push({
            key: 'siteInfo',
            promise: ({ location, store: { dispatch } }) => {
              __SERVER__ &&
                dispatch(getSiteInfo(getBaseUrl(location.pathname)));
            },
          });
        }
        return dispatchActions;
      },
    },
  ];

  return config;
};

export default applyConfig;
