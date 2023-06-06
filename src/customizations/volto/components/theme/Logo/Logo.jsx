/**
 * Logo component.
 * @module components/theme/Logo/Logo
 */

import { UniversalLink } from '@plone/volto/components';
import LogoImage from '@plone/volto/components/theme/Logo/Logo.svg';
import config from '@plone/volto/registry';
import { useSelector } from 'react-redux';
import { Image } from 'semantic-ui-react';

/**
 * Logo component class.
 * @function Logo
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component.
 */
const Logo = () => {
  const { settings } = config;
  const lang = useSelector((state) => state.intl.locale);
  const logoUrl = useSelector((state) => state.siteInfo.logo_url);
  const siteTitle = useSelector((state) => state.siteInfo.title);

  return (
    <UniversalLink href={settings.isMultilingual ? `/${lang}` : '/'}>
      <Image
        src={
          logoUrl && !logoUrl.includes('++resource++plone-logo.svg')
            ? logoUrl
            : LogoImage
        }
        height={40}
        alt=""
      />
      <span className="sr-only">{siteTitle}</span>
    </UniversalLink>
  );
};

export default Logo;
