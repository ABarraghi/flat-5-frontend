import { Form } from '@/components/common/Form';
import { type FreightBase, type LocationBase, type SearchForm } from '@/types/search';
import { useForm } from 'react-hook-form';
import Button from '@/components/common/Button';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import cn from 'classnames';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import AdvancedForm from '@/components/Search/MainSearch/AdvancedForm';
import RouteOverview from '@/components/RouteOverview';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DetailRoute from '@/components/DetailRoute';
import FreightSearch from '@/components/Search/LocationSearch/FreightSearch';
import { type RouteInfo } from '@/types/route';
import { getSearchLoad } from '@/services/searchAPI';
import dayjs from 'dayjs';

interface MainSearchProps {
  setLocations: Dispatch<SetStateAction<any>>;
  setPoints: Dispatch<SetStateAction<any>>;
  locations: LocationBase[];
  setIsLoading: Dispatch<SetStateAction<any>>;
  isLoading: boolean;
}
const MainSearch = ({ setLocations, setPoints, locations, setIsLoading, isLoading }: MainSearchProps) => {
  const [isOpenAdvanced, setIsOpenAdvanced] = useState(false);
  const [isEnableRouteOverview, setIsEnableRouteOverview] = useState(false);
  const [routes, setRoutes] = useState<RouteInfo[]>([]);
  const [originalData, setOriginalData] = useState<RouteInfo[]>([]);

  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [detailRoute, setDetailRoute] = useState<RouteInfo>();
  const [selectedRoute, setSelectedRoute] = useState<RouteInfo>();
  const handleOpenDetail = (isOpen: boolean) => {
    setIsOpenDetail(isOpen);
  };

  const methods = useForm<SearchForm>({
    defaultValues: {
      freights: [
        {
          title: 'A',
          location: {
            coordinate: {
              latitude: 0,
              longitude: 0,
            },
            city: '',
            state: '',
            country: '',
            postCode: '',
          },
          radius: 0,
          stopDate: null,
        },
        {
          title: 'B',
          location: {
            coordinate: {
              latitude: 0,
              longitude: 0,
            },
            city: '',
            state: '',
            country: '',
            postCode: '',
          },
          radius: 0,
          stopDate: null,
        },
      ],
      returnToOrigin: true,
      routeOption: 'route_my_truck',
      equipmentTypes: ['dry_van'],
      specialNotes: [],
      shipmentFormats: [],
    },
  });
  const toggleCollapseAdvanceForm = () => {
    setIsOpenAdvanced((state) => !state);
  };
  const transformData = (data: any) => {
    const stopPoints = data.freights
      .filter((item: FreightBase) => {
        return (
          (item.location.coordinate?.latitude && item.location.coordinate?.longitude) ||
          item.location.city ||
          item.location.state ||
          item.location.country
        );
      })
      .map((item: any) => {
        return {
          location: {
            coordinate: {
              latitude: item.location.coordinate?.latitude,
              longitude: item.location.coordinate?.longitude,
            },
            city: item.location.city !== '' ? item.location.city : undefined,
            state: item.location.state !== '' ? item.location.state : undefined,
            country: item.location.country !== '' ? item.location.country : undefined,
          },
          radius: item.radius ? parseInt(String(item.radius)) : 0,
          stopDate: {
            from: item.stopDate[0] ? dayjs(item.stopDate[0]).startOf('day') : undefined,
            to: item.stopDate[1] ? dayjs(item.stopDate[1]).endOf('day') : undefined,
          },
        };
      });
    return {
      stopPoints,
      equipmentType: data.equipmentTypes?.length > 0 ? data.equipmentTypes[0] : '',
    };
  };
  const handleViewDetailRoute = (id: string) => {
    setDetailRoute(routes.find((route) => route.id === id));
  };

  const watchRouteOption = methods.watch('routeOption');
  const onSubmit = async (submitData: any) => {
    try {
      setIsLoading(true);
      setRoutes((prevState) => []);
      const requestData = transformData(submitData);
      if (requestData.stopPoints.length < 2) {
        toast('The position is not accurate; we need at least a starting point and an endpoint. ', { type: 'error' });
        return;
      }

      const data = await getSearchLoad(requestData);
      let routesRs: RouteInfo[] = [];
      routesRs = data.map((route, index) => {
        const brokers = route.loads?.map((load) => load.broker);
        return { ...route, id: `${index}`, isSelected: false, brokers };
      });
      setOriginalData(routesRs);

      routesRs = routesRs.filter((route) => {
        if (watchRouteOption === 'en_route') {
          return route.type === 'enRoute';
        } else {
          return route;
        }
      });

      setRoutes((prevState) => routesRs);
      toast('Search data successfully', { type: 'success' });
      setIsEnableRouteOverview(true);
      setIsOpenAdvanced(false);
    } catch (error) {
      console.log('error: ', error);
      toast('Occur error when search data', { type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = () => {
    setRoutes([]);
    setPoints([]);
  };
  useEffect(() => {
    if (watchRouteOption && originalData) {
      if (watchRouteOption === 'en_route') {
        const routeRs = originalData.filter((route) => route.type === 'enRoute');
        setRoutes(routeRs);
      } else {
        setRoutes(originalData);
      }
    }
  }, [originalData, watchRouteOption]);
  return (
    <>
      {!isOpenDetail && (
        <>
          <Form methods={methods as any} className={'p-5'}>
            <Form.Radio
              name="routeOption"
              options={[
                { value: 'route_my_truck', label: 'Route my truck' },
                { value: 'en_route', label: 'En Route' },
              ]}
              customClass="py-10"
            />
            <FreightSearch setLocations={setLocations} refreshData={refreshData} />
            {/* <LocationSearch /> */}
            <div className="flex items-center justify-between text-[16px] font-normal">
              {/* <Form.Checkbox name="returnToOrigin" label="Return to origin after delivery" /> */}
              <span className="flex items-center justify-between text-[#393978]" onClick={toggleCollapseAdvanceForm}>
                {isOpenAdvanced ? 'Hide advanced options' : 'View advanced options'} &nbsp;
                <ChevronDownIcon
                  className={cn('h-4 w-4 origin-center font-bold', { 'rotate-180 transform': isOpenAdvanced })}
                />
              </span>
            </div>
            {isOpenAdvanced && <AdvancedForm />}
            <div className="flex justify-end p-5">
              <Button
                name="Search"
                wrapperClass="rounded-md bg-[#F16521] py-[5px] justify-ebd"
                contentClass="text-white text-[16px] tracking-tight sm:tracking-normal normal-case"
                onClick={methods.handleSubmit(onSubmit)}
                loading={isLoading}
                disabled={isLoading}
              >
                &nbsp; <MagnifyingGlassIcon className="h-5 w-5 text-white" />
              </Button>
            </div>
          </Form>
          {isEnableRouteOverview && routes.length === 0 && (
            <div className="flex justify-center p-5">Can not found suitable route </div>
          )}
          {isEnableRouteOverview && routes.length > 0 && (
            <RouteOverview
              setIsOpenDetail={setIsOpenDetail}
              routes={routes}
              handleViewDetailRoute={handleViewDetailRoute}
              setPoints={setPoints}
              setSelectedRoute={setSelectedRoute}
              setRoutes={setRoutes}
            />
          )}
        </>
      )}

      {isOpenDetail && detailRoute && selectedRoute && (
        <DetailRoute isBooked={false} handleOpenDetail={handleOpenDetail} item={selectedRoute} locations={locations} />
      )}
      <ToastContainer />
    </>
  );
};
export default MainSearch;
