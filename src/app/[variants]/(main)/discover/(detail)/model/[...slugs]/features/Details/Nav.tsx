'use client';

import { Icon, Tabs } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { BookOpenIcon, ListIcon, Settings2Icon } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';
import { ModelNavKey } from '@/types/discover';

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
  activeTab?: ModelNavKey;
  mobile?: boolean;
  setActiveTab?: (tab: ModelNavKey) => void;
}

const Nav = memo<NavProps>(({ mobile, setActiveTab, activeTab = ModelNavKey.Overview }) => {
  const { t } = useTranslation('discover');
  const { styles } = useStyles();

  const nav = (
    <Tabs
      activeKey={activeTab}
      compact={mobile}
      items={[
        {
          icon: <Icon icon={BookOpenIcon} size={16} />,
          key: ModelNavKey.Overview,
          label: t('models.details.overview.title'),
        },
        {
          icon: <Icon icon={Settings2Icon} size={16} />,
          key: ModelNavKey.Parameter,
          label: t('models.parameterList.title'),
        },
        {
          icon: <Icon icon={ListIcon} size={16} />,
          key: ModelNavKey.Related,
          label: t('models.details.related.title'),
        },
      ]}
      onChange={(key) => setActiveTab?.(key as ModelNavKey)}
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
