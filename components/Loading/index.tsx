import React from 'react';
import LoadingIcon from '@/components/Loading/LoadingIcon';

export const WrapperLoadingIcon = ({ title }: { title?: string }) => {
  return (
    <div className="fixed left-[50%] top-2 z-50 grid items-center justify-start">
      <LoadingIcon />
    </div>
  );
};
