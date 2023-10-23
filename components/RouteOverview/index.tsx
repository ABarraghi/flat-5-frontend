import { useEffect, useState } from 'react';
import RouteOverviewItem from '@/components/RouteOverview/RouteOverviewItem';

const Carriers = ['land-star', 'coyote'];
interface RouteOverviewProps {
  id: string;
  isSelected?: boolean;
  setIsOpenDetail: (isOpen: boolean) => void;
}
const data = [
  { id: '1', isSelected: false },
  { id: '2', isSelected: false },
  { id: '3', isSelected: false },
];
const RouteOverview = ({ id, setIsOpenDetail }: RouteOverviewProps) => {
  const [enable, setEnable] = useState(false);
  const [items, setItems] = useState(data);
  const handleClick = (e) => {
    setEnable((state) => !state);
  };

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
      {items?.map((item) => (
        <RouteOverviewItem
          key={item.id}
          data={item}
          onChangeSelected={onChangeSelected}
          setIsOpenDetail={setIsOpenDetail}
        />
      ))}
    </>
  );
};
export default RouteOverview;
