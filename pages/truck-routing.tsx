import Layout from '@/components/layout';
import MainSearch from '@/components/Search/MainSearch';
import DetailRoute from '@/components/DetailRoute';
import { useState } from 'react';
import MapContainer from '@/components/MapContainer';

export default function TruckRouting() {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [startLocation, setStartLocation] = useState<number[]>([]);
  const [endLocation, setEndLocation] = useState<number[]>([]);
  const handleOpenDetail = (isOpen: boolean) => {
    setIsOpenDetail(isOpen);
  };
  return (
    <Layout>
      <div className="grid h-[calc(100vh_-_15rem)] w-full grid-cols-7 gap-x-3 bg-transparent lg:items-start">
        <div className="col-span-3 h-full rounded-xl bg-white font-normal text-[#393978]">
          {!isOpenDetail && (
            <MainSearch
              setIsOpenDetail={handleOpenDetail}
              setStartLocation={setStartLocation}
              setEndLocation={setEndLocation}
            />
          )}
          {isOpenDetail && <DetailRoute isBooked={false} />}
        </div>
        <div className="col-span-4 h-auto h-full rounded-xl bg-white text-2xl text-[#393978]">
          <MapContainer start={startLocation} end={endLocation} />
        </div>
      </div>
    </Layout>
  );
}
