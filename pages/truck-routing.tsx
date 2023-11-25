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
      <div className="flex w-full gap-x-3  bg-transparent lg:items-start">
        {(isLoading || isMapLoading) && <WrapperLoadingIcon title="" />}
        <div className="h-full max-h-[calc(100vh_-_10rem)] min-h-[calc(100vh_-_10rem)] w-5/12 overflow-scroll rounded-xl bg-white font-normal text-[#393978] ">
          <MainSearch
            setLocations={setLocations}
            setPoints={setPoints}
            locations={locations}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </div>
        <div className="col-span-4 w-7/12 rounded-xl bg-white text-2xl text-[#393978]">
          <MapContainer locations={locations} points={points} setIsLoading={setIsMapLoading} />
        </div>
      </div>
    </Layout>
  );
}
