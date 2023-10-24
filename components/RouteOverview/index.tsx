import { useState } from 'react';
import RouteOverviewItem from '@/components/RouteOverview/RouteOverviewItem';
import { type Route } from '@/types/load';

interface RouteOverviewProps {
  setIsOpenDetail: (isOpen: boolean) => void;
  handleViewDetailRoute: (id: string) => void;
  routes: Route[];
}
const RouteOverview = ({ setIsOpenDetail, routes, handleViewDetailRoute }: RouteOverviewProps) => {
  const [items, setItems] = useState(routes);

  const onChangeSelected = (id: string) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
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
