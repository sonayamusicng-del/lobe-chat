'use client';

import { Icon, Tabs } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { BookOpenIcon, BrainCircuitIcon, ListIcon } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';
import { ProviderNavKey } from '@/types/discover';

import { useDetailContext } from '../DetailProvider';

const useStyles = createStyles(({ css, token }) => {
  return {
    link: css`
      color: ${token.colorTextDescription};

      &:hover {
        color: ${token.colorInfo};
      }
    `,
    nav: css`
      border-block-end: 1px solid ${token.colorBorder};
    `,
  };
});

interface NavProps {
  activeTab?: ProviderNavKey;
  mobile?: boolean;
  setActiveTab?: (tab: ProviderNavKey) => void;
}

const Nav = memo<NavProps>(({ mobile, setActiveTab, activeTab = ProviderNavKey.Overview }) => {
  const { t } = useTranslation('discover');
  const { identifier } = useDetailContext();
  const { styles } = useStyles();

  const nav = (
    <Tabs
      activeKey={activeTab}
      compact={mobile}
      items={[
        {
          icon: <Icon icon={BookOpenIcon} size={16} />,
          key: ProviderNavKey.Overview,
          label: t('providers.details.overview.title'),
        },
        {
          icon: <Icon icon={BrainCircuitIcon} size={16} />,
          key: ProviderNavKey.Guide,
          label: t('providers.details.guide.title'),
        },
        {
          icon: <Icon icon={ListIcon} size={16} />,
          key: ProviderNavKey.Related,
          label: t('providers.details.related.title'),
        },
      ]}
      onChange={(key) => setActiveTab?.(key as ProviderNavKey)}
    />
  );

  return mobile ? (
    nav
  ) : (
    <Flexbox align={'center'} className={styles.nav} horizontal justify={'space-between'}>
      {nav}

    </Flexbox>
  );
});

export default Nav;
