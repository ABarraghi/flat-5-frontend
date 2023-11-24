import Layout from '@/components/layout';
import MainSearch from '@/components/Search/MainSearch';
import { useState } from 'react';
import MapContainer from '@/components/MapContainer';
import { type LocationBase } from '@/types/search';
import { WrapperLoadingIcon } from '@/components/Loading';
import { type LoadPoint } from '@/types/load';
import { type RouteInfo } from '@/types/route';

export default function TruckRouting() {
  const [locations, setLocations] = useState<LocationBase[]>([]);
  const [points, setPoints] = useState<LoadPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(false);
  const [routes, setRoutes] = useState<RouteInfo[]>([]);
  const [isOpenDetail, setIsOpenDetail] = useState(false);

  return (
    <Layout>
      <div className="flex w-full flex-col gap-x-3 gap-y-3 bg-transparent sm:flex-row sm:gap-y-0 lg:items-start">
        {(isLoading || isMapLoading) && <WrapperLoadingIcon title="" />}
        <div className="h-[50vh] max-h-[calc(100vh_-_10rem)] w-full overflow-scroll rounded-xl bg-white font-normal text-[#393978] sm:h-full sm:h-full sm:min-h-[calc(100vh_-_10rem)] sm:w-5/12 ">
          <MainSearch
            setLocations={setLocations}
            setPoints={setPoints}
            locations={locations}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            routes={routes}
            setRoutes={setRoutes}
            setIsOpenDetail={setIsOpenDetail}
            isOpenDetail={isOpenDetail}
          />
        </div>
        <div className="h-[50vh] w-full overflow-scroll rounded-xl bg-white text-2xl text-[#393978] sm:h-full sm:w-7/12">
          <MapContainer
            locations={locations}
            points={points}
            setIsLoading={setIsMapLoading}
            routes={routes}
            isOpenDetail={isOpenDetail}
          />
        </div>
      </div>
    </Layout>
  );
}
