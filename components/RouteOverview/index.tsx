import { type Dispatch, type SetStateAction, useState } from 'react';
import RouteOverviewItem from '@/components/RouteOverview/RouteOverviewItem';
import { type Route } from '@/types/load';

interface RouteOverviewProps {
  setIsOpenDetail: (isOpen: boolean) => void;
  handleViewDetailRoute: (id: string) => void;
  routes: Route[];
  setPoints: Dispatch<SetStateAction<any>>;
  setSelectedRoute: Dispatch<SetStateAction<any>>;
}
const RouteOverview = ({
  setIsOpenDetail,
  routes,
  handleViewDetailRoute,
  setPoints,
  setSelectedRoute,
}: RouteOverviewProps) => {
  const [items, setItems] = useState(routes);

  const onChangeSelected = (id: string) => {
    const newItems = items.map((item) => {
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
    setItems(newItems);
  };

  return (
    <>
      {items?.map((route) => (
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
