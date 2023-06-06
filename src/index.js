import { getSiteInfo } from './actions';
import { siteInfo } from './reducers';
import { getAPIResourceWithAuth } from '@plone/volto/helpers';

// Taken from @plone/volto/src/express-middleware/images.js
const HEADERS = ['content-type', 'content-disposition', 'cache-control'];
function siteLogoMiddlewareFunction(req, res, next) {
  getAPIResourceWithAuth(req)
    .then((resource) => {
      // Just forward the headers that we need
      HEADERS.forEach((header) => {
        if (resource.headers[header]) {
          res.set(header, resource.headers[header]);
        }
      });
      res.send(resource.body);
    })
    .catch(next);
}

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

  if (__SERVER__) {
    const express = require('express');
    const logoMiddleware = express.Router();
    logoMiddleware.id = 'site-logo-middleware';
    logoMiddleware.all('**/@@site-logo/*', siteLogoMiddlewareFunction);
    config.settings.expressMiddleware = [
      ...config.settings.expressMiddleware,
      logoMiddleware,
    ];
  }

  return config;
};

export default applyConfig;
