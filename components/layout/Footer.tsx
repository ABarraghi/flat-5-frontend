import React from 'react';

const Footer = () => {
  return (
    <footer className="font-notoSans fixed bottom-0 w-full border-t bg-white px-10 py-5 text-center text-gray-500">
      <div className="flex justify-between">
        <div className="justify-star align-center flex">
          <div className="mx-5 text-[16px] font-normal">Help</div>
          <div className="mx-5 text-[16px]">Term of Use</div>
          <div className="mx-5 text-[16px]">Privacy Policy</div>
        </div>

        <div className="text-[16px]">Flat5 &#169; 2023</div>
      </div>
    </footer>
  );
};

export default Footer;
