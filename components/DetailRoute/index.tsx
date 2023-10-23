import PriceAndDistance from '@/components/RouteOverview/PriceAndDistance';
import { Button } from 'antd';
import { CheckOutlined, LeftOutlined } from '@ant-design/icons';
import StepRoute from '@/components/DetailRoute/StepRoute';
import { useState } from 'react';

interface DetailRouteProps {
  isBooked?: boolean;
}

const DetailRoute = ({ isBooked }: DetailRouteProps) => {
  const [isBookedRoute, setIsBookedRoute] = useState(isBooked);
  const onClickBookRoute = () => {
    setIsBookedRoute((state) => !state);
  };
  return (
    <>
      <div className="flex justify-between border-b px-5 py-2 text-[#393978]">
        <div className="flex gap-5">
          <LeftOutlined className="stroke-[#393978] stroke-[50px]" />
          <PriceAndDistance price={5124} distance={2242} customClass="text-2xl" />
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
        <StepRoute />
      </div>
    </>
  );
};
export default DetailRoute;
