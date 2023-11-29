import RouteOverviewItem from '@/components/RouteOverview/RouteOverviewItem';
import { type RouteInfo } from '@/types/route';

interface RouteOverviewProps {
  setIsOpenDetail: (isOpen: boolean) => void;
  handleViewDetailRoute: (id: string) => void;
  routes: RouteInfo[];
  selectedRouteId: string;
  handleChangeRouteOverview: (id: string, routes: RouteInfo[]) => void;
  returnDate: string;
}
const RouteOverview = ({
  setIsOpenDetail,
  routes,
  handleViewDetailRoute,
  handleChangeRouteOverview,
  selectedRouteId,
  returnDate,
}: RouteOverviewProps) => {
  const onChangeSelected = (id: string) => {
    handleChangeRouteOverview(id, routes);
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
          selectedRouteId={selectedRouteId}
          returnDate={returnDate}
        />
      ))}
    </>
  );
};
export default RouteOverview;
