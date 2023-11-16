import { type Dispatch, type SetStateAction } from 'react';
import RouteOverviewItem from '@/components/RouteOverview/RouteOverviewItem';
import { type RouteInfo } from '@/types/route';

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
          const pickupAndDeliveryPoints: number[][] = [];
          item.loads?.forEach((load) => {
            pickupAndDeliveryPoints.push([load.pickupStop.coordinates.longitude, load.pickupStop.coordinates.latitude]);
            pickupAndDeliveryPoints.push([
              load.deliveryStop.coordinates.longitude,
              load.deliveryStop.coordinates.latitude,
            ]);
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
