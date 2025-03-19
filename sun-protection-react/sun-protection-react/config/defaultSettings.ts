import type { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  colorPrimary: '#1890ff',
  layout: 'side', // ✅ 侧边菜单栏
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  siderMenuType: 'collapsed', // ✅ 默认收起
  collapsed: true, // ✅ 确保默认收起
  colorWeak: false,
  title: 'Sun Protection',
  pwa: true,
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  iconfontUrl: '',
};

export default Settings;
