import React from 'react'

const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full px-10 py-5 text-center font-notoSans border-t bg-white text-gray-500">
      <div className="flex justify-between">
        <div className="flex justify-star align-center">
          <div className="text-[16px] font-normal mx-5">Help</div>
          <div className="text-[16px] mx-5">Term of Use</div>
          <div className="text-[16px] mx-5">Privacy Policy</div>
        </div>

        <div className="text-[16px]">Flat5 &#169; 2023</div>
      </div>
    </div>
  )
}

export default Footer
