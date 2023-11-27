import { Form } from '@/components/common/Form';
import { type FreightBase, type LocationBase, type SearchForm } from '@/types/search';
import { useForm } from 'react-hook-form';
import Button from '@/components/common/Button';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import cn from 'classnames';
import { type Dispatch, type SetStateAction, useCallback, useEffect, useState } from 'react';
import AdvancedForm from '@/components/Search/MainSearch/AdvancedForm';
import RouteOverview from '@/components/RouteOverview';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DetailRoute from '@/components/DetailRoute';
import FreightSearch from '@/components/Search/LocationSearch/FreightSearch';
import { type RouteInfo } from '@/types/route';
import { getSearchLoad } from '@/services/searchAPI';
import dayjs from 'dayjs';
import FullTruckIcon from '@/components/common/icons/FullTruckIcon';
import EmptyTruckIcon from '@/components/common/icons/EmptyTruckIcon';
import { type LoadPoint } from '@/types/load';
import { Tooltip } from 'antd';

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
  const [selectedRoute, setSelectedRoute] = useState<RouteInfo | undefined>();
  const [returnDate, setReturnDate] = useState<string>('');
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
          isPickedLoad: false,
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
          isPickedLoad: false,
        },
      ],
      returnToOrigin: true,
      routeOption: 'standard',
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
            coordinates: {
              latitude: item.location.coordinate?.latitude,
              longitude: item.location.coordinate?.longitude,
            },
            city: item.location.city !== '' ? item.location.city : undefined,
            state: item.location.state !== '' ? item.location.state : undefined,
            country: item.location.country !== '' ? item.location.country : undefined,
          },
          hadLoad: item.isPickedLoad,
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
        return { ...route, id: `${index}`, brokers };
      });
      setOriginalData(routesRs);

      routesRs = routesRs.filter((route) => {
        return route.type === watchRouteOption;
      });
      if (routesRs.length > 0) {
        handleChangeRouteOverview(routesRs[0].id);
      }

      const lastDateTo = requestData.stopPoints[requestData.stopPoints.length - 1]?.stopDate?.to;
      if (lastDateTo) {
        const returnDate = dayjs(lastDateTo).format('MM/DD/YYYY');
        setReturnDate(returnDate);
      }

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

  const handleChangeRouteOverview = useCallback(
    (id: string) => {
      const selectRoute = originalData.find((route) => route.id === id);
      setSelectedRoute(selectRoute);
      const pickupAndDeliveryPoints: LoadPoint[] = [];
      selectRoute?.loads?.forEach((load) => {
        const point: LoadPoint = {
          keyPoints: load.keyByPoints,
          fromPoint: [load.pickupStop.coordinates.longitude, load.pickupStop.coordinates.latitude],
          toPoint: [load.deliveryStop.coordinates.longitude, load.deliveryStop.coordinates.latitude],
        };
        pickupAndDeliveryPoints.push(point);
      });
      setPoints(pickupAndDeliveryPoints);
    },
    [originalData, setPoints],
  );

  const refreshData = useCallback(() => {
    setRoutes([]);
    setPoints([]);
  }, [setPoints]);
  useEffect(() => {
    if (watchRouteOption && originalData) {
      const routeRs = originalData.filter((route) => route.type === watchRouteOption);
      setRoutes(routeRs);
      if (routeRs.length > 0) {
        handleChangeRouteOverview(routeRs[0].id);
      } else {
        refreshData();
      }
    }
  }, [handleChangeRouteOverview, originalData, refreshData, watchRouteOption]);
  return (
    <>
      {!isOpenDetail && (
        <>
          <Form methods={methods as any} className={'p-10'}>
            <div className="flex items-center justify-between gap-x-5">
              <Form.Radio
                name="routeOption"
                options={[
                  { value: 'standard', label: 'Standard' },
                  { value: 'enRoute', label: 'En Route' },
                  { value: 'routeMyTrucks', label: 'Route my truck' },
                ]}
                customClass="py-10"
              />
              <div className="flex items-center gap-10">
                <Tooltip
                  title="No predefined shipment for this route. Search for available freight on this route."
                  color={'#393978'}
                  key={'empty-tooltip'}
                >
                  <div className="flex items-center">
                    <EmptyTruckIcon className="h-6 w-6" /> <span className="text-sm"> Empty </span>
                  </div>
                </Tooltip>
                <Tooltip
                  title="Shipment booked  on this route. No additional search needed."
                  color={'#393978'}
                  key={'full-tooltip'}
                >
                  <div className="flex items-center">
                    <FullTruckIcon className="h-6 w-6" /> <span className="text-sm"> Full</span>
                  </div>
                </Tooltip>
              </div>
            </div>

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
          {isEnableRouteOverview && routes.length === 0 && !isLoading && (
            <div className="flex justify-center p-5">Can not found suitable route </div>
          )}
          {isEnableRouteOverview && routes.length > 0 && (
            <RouteOverview
              setIsOpenDetail={setIsOpenDetail}
              routes={routes}
              handleViewDetailRoute={handleViewDetailRoute}
              handleChangeRouteOverview={handleChangeRouteOverview}
              selectedRouteId={selectedRoute?.id || ''}
              returnDate={returnDate}
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
