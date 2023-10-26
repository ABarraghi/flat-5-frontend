import { type Dispatch, type SetStateAction, useState } from 'react';
import RouteOverviewItem from '@/components/RouteOverview/RouteOverviewItem';
import { type Route } from '@/types/load';

interface RouteOverviewProps {
  setIsOpenDetail: (isOpen: boolean) => void;
  handleViewDetailRoute: (id: string) => void;
  routes: Route[];
  setPoints: Dispatch<SetStateAction<any>>;
  setSelectedRoute: Dispatch<SetStateAction<any>>;
  setRoutes: Dispatch<SetStateAction<any>>;
}
const RouteOverview = ({
  setIsOpenDetail,
  routes,
  handleViewDetailRoute,
  setPoints,
  setSelectedRoute,
  setRoutes,
}: RouteOverviewProps) => {
  const onChangeSelected = (id: string) => {
    const newItems = routes.map((item) => {
      if (item.id === id) {
        if (!item.isSelected) {
          const pickupPoints = item.loads.map((load) => {
            return [load.pickupStop.coordinates.longitude, load.pickupStop.coordinates.latitude];
          });
          setPoints(pickupPoints);
          setSelectedRoute({ ...item, isSelected: !item.isSelected });
        }
        return { ...item, isSelected: !item.isSelected };
      } else {
        return { ...item, isSelected: false };
      }
    });
    setRoutes(newItems);
  };

  return (
    <>
      {routes?.map((route) => (
        <RouteOverviewItem
          key={route.id}
          data={route}
          onChangeSelected={onChangeSelected}
          setIsOpenDetail={setIsOpenDetail}
          handleViewDetailRoute={handleViewDetailRoute}
        />
      ))}
    </>
  );
};
export default RouteOverview;
