import React from 'react';

import {Dropdown, Menu,Icon} from 'antd'

export const DropOption = ({onMenuClick, menuOptions = [], buttonStyle, dropdownProps,}) => {
  const menu = menuOptions.map(item => <Menu.Item key={item.key}>{item.name}</Menu.Item>);
  return (<Dropdown
    overlay={<Menu onClick={onMenuClick}>{menu}</Menu>}
    {...dropdownProps}
  >
    <a href="javascript:;">更多<Icon type="down" /></a>
  </Dropdown>)
};
