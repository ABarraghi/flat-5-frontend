import React from 'react';

const Footer = () => {
  return (
    <footer className="font-notoSans fixed bottom-0 w-full border-t bg-white p-8 text-center text-gray-500">
      <div className="flex justify-between">
        <div className="justify-star align-center flex gap-12">
          <div className="text-[12px] font-normal md:text-[16px]">Help</div>
          <div className="text-[12px] md:text-[16px]">Term of Use</div>
          <div className="text-[12px] md:text-[16px]">Privacy Policy</div>
        </div>
        <div className="text-[12px] md:text-[16px]">Flat5 &#169; 2023</div>
      </div>
    </footer>
  );
};

export default Footer;
