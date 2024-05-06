import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined className="text-[#F16521]" style={{ fontSize: '50px' }} spin />;

export const Loading = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 grid items-center justify-center">
      <div className="absolute left-[50%] top-3">
        <Spin size="large" indicator={antIcon} />
      </div>
    </div>
  );
};
