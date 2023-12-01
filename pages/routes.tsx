import Layout from '@/components/layout';
import MainSearch from '@/components/Search/MainSearch';
import { useState } from 'react';
import MapContainer from '@/components/MapContainer';
import { type LocationBase } from '@/types/search';
import { WrapperLoadingIcon } from '@/components/Loading';
import { type LoadPoint } from '@/types/load';

export default function TruckRouting() {
  const [locations, setLocations] = useState<LocationBase[]>([]);
  const [points, setPoints] = useState<LoadPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(false);

  return (
    <Layout>
      {/* <div className="flex w-full gap-x-3  bg-transparent lg:items-start"> */}
      <div className="flex w-full flex-col gap-x-3 gap-y-3 bg-transparent sm:flex-row sm:gap-y-0 lg:items-start">
        {(isLoading || isMapLoading) && <WrapperLoadingIcon title="" />}
        {/* <div className="h-full max-h-[calc(100vh_-_10rem)] min-h-[calc(100vh_-_10rem)] w-full overflow-scroll rounded-xl bg-white font-normal text-[#393978] sm:w-5/12 "> */}
        <div className="h-[50vh] max-h-[calc(100vh_-_10rem)] w-full overflow-scroll rounded-xl bg-white font-normal text-[#393978] sm:h-full sm:h-full sm:min-h-[calc(100vh_-_10rem)] sm:w-5/12 ">
          <MainSearch
            setLocations={setLocations}
            setPoints={setPoints}
            locations={locations}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </div>
        {/* <div className="col-span-4 w-full rounded-xl bg-white  text-2xl text-[#393978] sm:w-7/12"> */}
        <div className="h-[50vh] w-full overflow-scroll rounded-xl text-2xl text-[#393978] sm:h-full sm:w-7/12">
          <MapContainer locations={locations} points={points} setIsLoading={setIsMapLoading} />
        </div>
      </div>
    </Layout>
  );
}
