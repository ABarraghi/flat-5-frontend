import { DollarCircleFilled } from '@ant-design/icons';
import DistanceIcon from '@/components/common/icons/DistanceIcon';
import BranchLogo from '@/components/BranchLogo';
import { useState } from 'react';
import cn from 'classnames';
import Button from '@/components/common/Button';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

const Brands = ['land-star', 'coyote'];
const RouteOverview = () => {
  const [enable, setEnable] = useState(false);
  const handleClick = () => {
    console.log('abc');
    setEnable((state) => !state);
  };
  return (
    <div
      className={cn('m-5 rounded-xl bg-[#F2F2F7]', enable ? 'border border-solid border-orange-600' : '')}
      onClick={handleClick}
    >
      <div className="flex justify-between px-6 pt-6">
        <div className="flex text-[20px]">
          <div className="price">
            <DollarCircleFilled className="text-[#393978]" />
            <span className="ml-2 text-[#393978]">$5,124</span>
          </div>
          <div className="distance ml-10 flex items-center ">
            <DistanceIcon className="h-5 w-5" />
            <span className="font-light text-[#393978]">2242 mi</span>
          </div>
        </div>

        <div className="flex">
          {Brands.map((logo, index) => (
            <BranchLogo key={index} name={logo} />
          ))}
        </div>
      </div>
      <div className="flex justify-between p-6 text-[16px]">
        <span className="font-normal">Via Detroit, Louisville, and Cincinnati</span>
        <span className="font-light">Return on 11/12/2023</span>
      </div>
      {enable && (
        <Button
          name="View Details"
          wrapperClass="rounded-md bg-[#F16521] w-full"
          contentClass="text-white text-[16px] tracking-tight sm:tracking-normal normal-case"
        >
          &nbsp; <ArrowRightIcon className="h-5 w-5 text-white" />
        </Button>
      )}
    </div>
  );
};
export default RouteOverview;
