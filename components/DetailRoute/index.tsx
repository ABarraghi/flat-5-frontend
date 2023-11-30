import PriceAndDistance from '@/components/RouteOverview/PriceAndDistance';
import { Button } from 'antd';
import { CheckOutlined, LeftOutlined } from '@ant-design/icons';
import StepRoute from '@/components/DetailRoute/StepRoute';
import { useState } from 'react';
import { type LocationBase } from '@/types/search';
import { type RouteInfo } from '@/types/route';

interface DetailRouteProps {
  isBooked?: boolean;
  handleOpenDetail: (isOpen: boolean) => void;
  item: RouteInfo;
  locations: LocationBase[];
}

const DetailRoute = ({ isBooked, handleOpenDetail, item, locations }: DetailRouteProps) => {
  const { amount = 0, distance = 0, loads = [], type } = item;
  const [isBookedRoute, setIsBookedRoute] = useState(isBooked);
  const onClickBookRoute = () => {
    setIsBookedRoute((state) => !state);
  };
  const onBack = () => {
    handleOpenDetail(false);
  };
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-5 border-b px-5 py-2 text-[#393978]">
        <div className="flex gap-5">
          <LeftOutlined className="stroke-[#393978] stroke-[50px]" onClick={onBack} />
          <PriceAndDistance price={amount} distance={distance} customClass="text-lg xl:text-2xl gap-5 xl:gap-10" />
        </div>

        {!isBookedRoute ? (
          <Button
            className="flex h-full w-[100px] items-center justify-center border-none bg-[#F16521] p-3 text-[16px] text-white transition-all xl:w-[150px] xl:p-4"
            onClick={onClickBookRoute}
          >
            <span className="flex items-center items-center justify-center text-white" style={{ lineHeight: '100%' }}>
              <span>Book</span>
            </span>
          </Button>
        ) : (
          <Button className="text-black-500 flex h-full w-[100px] min-w-[100px] items-center justify-center border-none bg-[#F2F2F7] p-3 text-[16px] transition-all xl:w-[150px] xl:p-4">
            <CheckOutlined className="text-black-700 h-5 w-5" />
            <span className="flex items-center items-center justify-center" style={{ lineHeight: '100%' }}>
              <span>Booked</span>
            </span>
          </Button>
        )}
      </div>
      <div>
        <StepRoute locations={locations} loads={loads} routeType={type} />
      </div>
    </>
  );
};
export default DetailRoute;
