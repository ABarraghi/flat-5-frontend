import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined className="text-[#F16521]" style={{ fontSize: '50px' }} spin />;
const LoadingIcon = () => {
  return (
    <div className="relative">
      <Spin size="large" indicator={antIcon} />
    </div>
  );
};

export default LoadingIcon;
