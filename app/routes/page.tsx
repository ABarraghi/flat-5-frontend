'use client';

import { useState } from 'react';
import Layout from '@/components/layout';
import MapContainer from '@/app/routes/components/MapContainer';
import { Loading } from '@/components/common/Loading';
import { type LocationBase } from '@/types/search';
import { type LoadPoint } from '@/types/load';
import MainSearch from '@/app/routes/components/MainSearch';

export default function TruckRouting() {
  const [locations, setLocations] = useState<LocationBase[]>([]);
  const [points, setPoints] = useState<LoadPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(false);

  return (
    <Layout>
      <div className="flex w-full flex-col gap-x-3 gap-y-3 bg-transparent sm:flex-row sm:gap-y-0 lg:items-start">
        {(isLoading || isMapLoading) && <Loading />}
        <div className="h-[50vh] max-h-[calc(100vh_-_10rem)] w-full overflow-scroll rounded-xl bg-white font-normal text-[#393978] sm:h-full sm:min-h-[calc(100vh_-_10rem)] sm:w-5/12 ">
          <MainSearch
            setLocations={setLocations}
            setPoints={setPoints}
            locations={locations}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </div>
        <div className="h-[50vh] w-full overflow-scroll rounded-xl text-2xl text-[#393978] sm:h-full sm:w-7/12">
          <MapContainer locations={locations} points={points} setIsLoading={setIsMapLoading} />
        </div>
      </div>
    </Layout>
  );
}
