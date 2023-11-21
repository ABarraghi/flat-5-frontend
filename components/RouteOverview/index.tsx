import { type Dispatch, type SetStateAction } from 'react';
import RouteOverviewItem from '@/components/RouteOverview/RouteOverviewItem';
import { type RouteInfo } from '@/types/route';
import { type LoadPoint } from '@/types/load';

interface RouteOverviewProps {
  setIsOpenDetail: (isOpen: boolean) => void;
  handleViewDetailRoute: (id: string) => void;
  routes: RouteInfo[];
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
          const pickupAndDeliveryPoints: LoadPoint[] = [];
          item.loads?.forEach((load) => {
            const point: LoadPoint = {
              keyPoints: load.keyByPoints,
              fromPoint: [load.pickupStop.coordinates.longitude, load.pickupStop.coordinates.latitude],
              toPoint: [load.deliveryStop.coordinates.longitude, load.deliveryStop.coordinates.latitude],
            };
            pickupAndDeliveryPoints.push(point);
          });
          setPoints(pickupAndDeliveryPoints);
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
