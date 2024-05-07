import React from 'react';
import { RotateCw } from 'lucide-react';

export const Loading = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 grid items-center justify-center">
      <div className="absolute left-[50%] top-3">
        <RotateCw className="animate-spin text-[50px] text-[#F16521]" />
      </div>
    </div>
  );
};
