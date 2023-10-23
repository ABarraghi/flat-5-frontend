import Image from 'next/image';
import { type ReactNode } from 'react';
// import MaskGroupImage from 'public/images/MaskGroup.png';
interface HomeBannerProps {
  children: ReactNode;
}
const HomeBanner = ({ children }: HomeBannerProps) => {
  return (
    <div className="flex h-[616px] w-full bg-[#2A2A78]">
      <div className="relative h-full w-[50%] bg-[url('/images/mask_group.png')] bg-cover bg-no-repeat">
        <Image
          width={726}
          height={726}
          src={'/images/truck.png'}
          alt="Truck"
          className="z-100 top-100 absolute right-0"
        ></Image>
      </div>
      <div className="Info my-auto flex-1 p-[50px]">
        <p className="text-[36px] font-bold leading-10 text-[#FF7C33] lg:text-[72px]">Single Source</p>
        <p className="text-[36px] font-bold text-[#FFFFFF] lg:text-[72px]">Co-Broker</p>
        <p className="max-w-[440px] py-4 text-base text-[#FFFFFF]">
          Book more than $60B freight with one co-broker! Simplify your logistics with our comprehensive planning tool
          and find the most efficient routes and loads.
        </p>
        {children}
      </div>
    </div>
  );
};
export default HomeBanner;
