import React from 'react';
import LoadingIcon from '@/components/Loading/LoadingIcon';

export const WrapperLoadingIcon = ({ title }: { title?: string }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 grid items-center justify-center">
      <LoadingIcon />
    </div>
  );
};
