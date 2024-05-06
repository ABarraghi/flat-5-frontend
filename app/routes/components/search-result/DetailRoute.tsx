import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { CheckOutlined, LeftOutlined } from '@ant-design/icons';
import StepRoute from '@/app/routes/components/search-result/detail-route/StepRoute';
import PriceAndDistance from '@/app/routes/components/common/PriceAndDistance';
import { type LocationBase } from '@/types/search';
import { type RouteInfo } from '@/types/route';

import { getBookingStatus, submitBookingRequest } from '@/services/bookingAPI';
import { type CoyoteBookingStatus } from '@/types/booking';

interface DetailRouteProps {
  handleOpenDetail: (isOpen: boolean) => void;
  item: RouteInfo;
  locations: LocationBase[];
}

const DetailRoute = ({ handleOpenDetail, item, locations }: DetailRouteProps) => {
  console.log(item);
  console.log('--');
  console.log(locations);

  const { amount = 0, distance = 0, loads = [], type } = item;
  const [bookingStatus, setBookingStatus] = useState<CoyoteBookingStatus>();

  const onClickBookRoute = async () => {
    if (!item.loads?.[0].loadId) return;

    try {
      const submitResult = await submitBookingRequest({
        requestData: {
          broker: 'coyote',
          loadId: item.loads[0].loadId,
        },
      });

      toast('Submit booking request successfully', { type: 'success' });

      try {
        const bookingStatus = await getBookingStatus({ broker: 'coyote', bookingId: submitResult.bookingId });

        setBookingStatus(bookingStatus.status);
      } catch (error) {
        console.log('error: ', error);
        toast('Occur error when get booking status', { type: 'error' });
      }
    } catch (error) {
      console.log('error: ', error);
      toast('Occur error when submit booking request', { type: 'error' });
    }
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

        {bookingStatus !== 'Booked' ? (
          <Button
            className="flex h-full w-[100px] items-center justify-center border-none bg-[#F16521] p-3 text-[16px] text-white transition-all xl:w-[150px] xl:p-4"
            onClick={onClickBookRoute}
          >
            <span className="flex items-center justify-center text-white" style={{ lineHeight: '100%' }}>
              <span>Book</span>
            </span>
          </Button>
        ) : (
          <Button
            className="text-black-500 flex h-full w-[100px] min-w-[100px] items-center justify-center border-none bg-[#F2F2F7] p-3 text-[16px] transition-all xl:w-[150px] xl:p-4"
            disabled
          >
            <CheckOutlined className="text-black-700 h-5 w-5" />
            <span className="flex items-center justify-center" style={{ lineHeight: '100%' }}>
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
