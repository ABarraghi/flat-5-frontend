import PriceAndDistance from '@/components/RouteOverview/PriceAndDistance';
import { Button } from 'antd';
import { CheckOutlined, LeftOutlined } from '@ant-design/icons';
import StepRoute from '@/components/DetailRoute/StepRoute';
import { useState } from 'react';
import { type Route } from '@/types/load';
import { type LocationBase } from '@/types/search';

interface DetailRouteProps {
  isBooked?: boolean;
  handleOpenDetail: (isOpen: boolean) => void;
  item?: Route;
  locations: LocationBase[];
}

const DetailRoute = ({ isBooked, handleOpenDetail, item = {}, locations }: DetailRouteProps) => {
  const { totalAmount = 0, totalDistance = 0, loads } = item;
  const [isBookedRoute, setIsBookedRoute] = useState(isBooked);
  const onClickBookRoute = () => {
    setIsBookedRoute((state) => !state);
  };
  const onBack = () => {
    handleOpenDetail(false);
  };
  return (
    <>
      <div className="flex justify-between border-b px-5 py-2 text-[#393978]">
        <div className="flex gap-5">
          <LeftOutlined className="stroke-[#393978] stroke-[50px]" onClick={onBack} />
          <PriceAndDistance price={totalAmount} distance={totalDistance} customClass="text-2xl" />
        </div>

        {!isBookedRoute ? (
          <Button
            className="flex h-full w-[200px] items-center justify-center border-none bg-[#F16521] p-4 text-[16px] text-white transition-all"
            onClick={onClickBookRoute}
          >
            <span className="flex items-center items-center justify-center text-white" style={{ lineHeight: '100%' }}>
              <span>Book</span>
            </span>
          </Button>
        ) : (
          <Button className="text-black-500 flex h-full w-[200px] min-w-[100px] items-center justify-center border-none bg-[#F2F2F7] p-4 text-[16px] transition-all">
            <CheckOutlined className="text-black-700 h-5 w-5" />
            <span className="flex items-center items-center justify-center" style={{ lineHeight: '100%' }}>
              <span>Booked</span>
            </span>
          </Button>
        )}
      </div>
      <div>
        <StepRoute locations={locations} loads={loads} />
      </div>
    </>
  );
};
export default DetailRoute;
