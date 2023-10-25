import Layout from '@/components/layout';
import MainSearch from '@/components/Search/MainSearch';
import { useState } from 'react';
import MapContainer from '@/components/MapContainer';
import { type LocationBase } from '@/types/search';
import { WrapperLoadingIcon } from '@/components/Loading';

// const points = [
//   // [-80.827149, 41.09671],
//   // [-84.867378, 41.673357],
//   // [-76.262442, 40.235656],
//   // [-75.09663935799618, 39.85127372221958],
//   // [-74.97808238530305, 39.70876965160799],
//   // [-74.95498182035425, 39.82891810678271],
//   [-74.99402146819008, 39.86635824765436],
// ];

// const points2 = [[-75.15454438944138, 39.721350023945575]];
export default function TruckRouting() {
  const [locations, setLocations] = useState<LocationBase[]>([]);
  const [points, setPoints] = useState<number[][]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Layout>
      <div className="grid h-[calc(100vh_-_15rem)] w-full grid-cols-7 gap-x-3 bg-transparent lg:items-start">
        {isLoading && <WrapperLoadingIcon title="" />}

        <div className="col-span-3 h-full rounded-xl bg-white font-normal text-[#393978]">
          <MainSearch setLocations={setLocations} setPoints={setPoints} locations={locations} />
        </div>
        <div className="col-span-4 rounded-xl bg-white text-2xl text-[#393978]">
          <MapContainer locations={locations} points={points} setIsLoading={setIsLoading} />
        </div>
      </div>
    </Layout>
  );
}
