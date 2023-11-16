import BranchLogo from '@/components/CarrierLogo';
import cn from 'classnames';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from 'antd';
import PriceAndDistance from '@/components/RouteOverview/PriceAndDistance';
import React from 'react';
import { type RouteInfo } from '@/types/route';
import dayjs from 'dayjs';

interface RouteOverviewProps {
  data: RouteInfo;
  onChangeSelected: (id: string) => void;
  setIsOpenDetail: (isOpen: boolean) => void;
  handleViewDetailRoute: (id: string) => void;
}
const RouteOverviewItem = ({ data, onChangeSelected, setIsOpenDetail, handleViewDetailRoute }: RouteOverviewProps) => {
  const { id, isSelected } = data;
  const handleClick = (id: string) => {
    onChangeSelected(id);
  };
  const onClickViewDetail = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsOpenDetail(true);
    handleViewDetailRoute(id);
  };
  return (
    <div
      data-id={id}
      className={cn(
        'm-5 cursor-pointer rounded-xl bg-[#F2F2F7]',
        isSelected ? 'border border-solid border-[#F16521]' : '',
      )}
      onClick={() => handleClick(id)}
    >
      <div className="flex justify-between px-6 pt-6 text-[#393978]">
        <PriceAndDistance price={data.amount ?? 0} distance={data.distance ?? 0} />

        <div className="flex">
          {data.brokers?.map((logo, index) => (
            <BranchLogo key={index} name={logo} />
          ))}
        </div>
      </div>
      <div className="flex justify-between p-6 text-[16px]">
        <span className="mock-data font-normal">{data.description || 'Via Detroit, Louisville, and Cincinnati'}</span>
        <span className="mock-data font-light">
          Return on {data.returnAt ? dayjs(data.returnAt).format('MM/DD/YYYY') : '11/12/2023'}
        </span>
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
        </>
      )}
    </div>
  );
};
export default RouteOverviewItem;
