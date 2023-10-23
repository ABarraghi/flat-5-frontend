import BranchLogo from '@/components/CarrierLogo';
import cn from 'classnames';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from 'antd';
import PriceAndDistance from '@/components/RouteOverview/PriceAndDistance';
import React from 'react';

const Carriers = ['land-star', 'coyote'];
interface RouteOverviewProps {
  data: { id: string; isSelected?: boolean };
  onChangeSelected: (id: string) => void;
  setIsOpenDetail: (isOpen: boolean) => void;
}
const RouteOverviewItem = ({ data, onChangeSelected, setIsOpenDetail }: RouteOverviewProps) => {
  const { id, isSelected } = data;
  const handleClick = (id: string) => {
    onChangeSelected(id);
  };
  const onClickViewDetail = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsOpenDetail(true);
  };
  return (
    <div
      data-id={id}
      className={cn('m-5 rounded-xl bg-[#F2F2F7]', isSelected ? 'border border-solid border-[#F16521]' : '')}
      onClick={() => handleClick(id)}
    >
      <div className="flex justify-between px-6 pt-6 text-[#393978]">
        <PriceAndDistance price={5124} distance={2242} />

        <div className="flex">
          {Carriers.map((logo, index) => (
            <BranchLogo key={index} name={logo} />
          ))}
        </div>
      </div>
      <div className="flex justify-between p-6 text-[16px]">
        <span className="font-normal">Via Detroit, Louisville, and Cincinnati</span>
        <span className="font-light">Return on 11/12/2023</span>
      </div>
      {isSelected && (
        <>
          <Button
            className="flex h-full w-full min-w-[100px] items-center justify-center !rounded-b-lg !rounded-t-none border-none bg-[#F16521] p-4 text-[16px] text-white transition-all"
            onClick={onClickViewDetail}
          >
            <span className="flex items-center items-center justify-center text-white" style={{ lineHeight: '100%' }}>
              <span>View Details &nbsp; </span>
            </span>
            <ArrowRightIcon className="h-5 w-5 text-white" />
          </Button>

          {/* <Button */}
          {/*   name="View Details" */}
          {/*   wrapperClass="rounded-md bg-[#F16521] w-full" */}
          {/*   contentClass="text-white text-[16px] tracking-tight sm:tracking-normal normal-case" */}
          {/*   // onClick={onClickViewDetail} */}
          {/* > */}
          {/*   <ArrowRightIcon className="h-5 w-5" /> */}
          {/* </Button> */}
        </>
      )}
    </div>
  );
};
export default RouteOverviewItem;
