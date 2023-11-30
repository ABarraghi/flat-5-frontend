import Image from 'next/image';
import { type ReactNode } from 'react';
// import MaskGroupImage from 'public/images/MaskGroup.png';
interface HomeBannerProps {
  children: ReactNode;
}
const HomeBanner = ({ children }: HomeBannerProps) => {
  return (
    <div className="flex h-[400px] w-full bg-[#2A2A78] md:h-[616px]">
      <div className="relative hidden h-full w-[50%] bg-[url('/images/mask_group.png')] bg-cover bg-no-repeat md:block">
        <Image
          width={726}
          height={726}
          src={'/images/truck.png'}
          alt="Truck"
          className="z-100 top-100 absolute left-[50%] right-0 top-[50%] translate-x-[-50%] translate-y-[-50%]"
        ></Image>
      </div>
      <div className="Info my-auto flex-1 p-5 lg:p-[50px]">
        <p className="text-[16px] font-bold leading-10 text-[#FF7C33] md:text-[36px] lg:text-[72px]">Single Source</p>
        <p className="text-[16px] font-bold text-[#FFFFFF] md:text-[36px] lg:text-[72px]">Co-Broker</p>
        <p className="max-w-[440px] py-4 text-[12px] text-[#FFFFFF] lg:text-base">
          Book more than $60B freight with one co-broker! Simplify your logistics with our comprehensive planning tool
          and find the most efficient routes and loads.
        </p>
        {children}
      </div>
    </div>
  );
};
export default HomeBanner;
