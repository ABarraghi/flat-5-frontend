import { type Dispatch, type SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { Select, Tooltip } from 'antd';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import cn from 'classnames';
import { Form } from '@/components/common/Form';
import { type FreightBase, type LocationBase, type SearchForm } from '@/types/search';
import Button from '@/components/common/Button';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import RouteOverview from '@/app/routes/components/search-result/RouteOverview';
import DetailRoute from '@/app/routes/components/search-result/DetailRoute';
import FreightSearch from '@/app/routes/components/search-form/FreightSearch';
import { type RouteInfo } from '@/types/route';
import { getSearchLoad } from '@/services/searchAPI';
import FullTruckIcon from '@/components/common/icons/FullTruckIcon';
import EmptyTruckIcon from '@/components/common/icons/EmptyTruckIcon';
import { type LoadPoint } from '@/types/load';
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import AdvancedOptions from '@/app/routes/components/search-form/AdvancedOptions';
import 'react-toastify/dist/ReactToastify.css';

interface MainSearchProps {
  setLocations: Dispatch<SetStateAction<any>>;
  setPoints: Dispatch<SetStateAction<any>>;
  locations: LocationBase[];
  setIsLoading: Dispatch<SetStateAction<any>>;
  isLoading: boolean;
}

interface RoutesRefType {
  routes: RouteInfo[];
  currentSortCondition: boolean;
  currentSortType: string;
}

const defaultFreights = (title: string) => {
  return {
    title,
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
  };
};

const MainSearch = ({ setLocations, setPoints, locations, setIsLoading, isLoading }: MainSearchProps) => {
  const [isOpenAdvanced, setIsOpenAdvanced] = useState(false);
  const [isEnableRouteOverview, setIsEnableRouteOverview] = useState(false);
  const [routes, setRoutes] = useState<RouteInfo[]>([]);
  const [originalData, setOriginalData] = useState<RouteInfo[]>([]);

  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [detailRoute, setDetailRoute] = useState<RouteInfo>();
  const [selectedRoute, setSelectedRoute] = useState<RouteInfo | undefined>();
  const [returnDate, setReturnDate] = useState<string>('');
  const [noDataDisplay, setNoDataDisplay] = useState<string>('');
  const [sortType, setSortType] = useState<string>('rate');
  const [sortCondition, setSortCondition] = useState<boolean>(true);
  const routesRef = useRef<RoutesRefType>({
    routes: [],
    currentSortCondition: true,
    currentSortType: 'rate',
  });

  const handleOpenDetail = (isOpen: boolean) => {
    setIsOpenDetail(isOpen);
  };

  const methods = useForm<SearchForm>({
    defaultValues: {
      freights: [defaultFreights('A'), defaultFreights('B')],
      returnToOrigin: true,
      routeOption: 'standard',
      equipmentTypes: ['dry_van'],
      specialNotes: [],
      shipmentFormats: [],
      broker: 'all',
      isReturnOrigin: false,
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
        const currentTime = dayjs();
        let stopDateFrom = item.stopDate[0] ? dayjs(item.stopDate[0]) : undefined;
        if (stopDateFrom && stopDateFrom.format('DD/MM/YYYY') === currentTime.format('DD/MM/YYYY')) {
          stopDateFrom = stopDateFrom
            ? stopDateFrom
                .set('hour', currentTime.hour())
                .set('minute', currentTime.minute())
                .set('second', currentTime.second())
                .set('millisecond', currentTime.millisecond())
                .add(2, 'minutes')
            : undefined;
        } else {
          stopDateFrom = stopDateFrom ? dayjs(stopDateFrom.startOf('day')) : undefined;
        }

        let stopDateTo = item.stopDate[1] ? dayjs(item.stopDate[1]) : undefined;
        stopDateTo = stopDateTo
          ? stopDateTo
              .set('hour', currentTime.hour())
              .set('minute', currentTime.minute())
              .set('second', currentTime.second())
              .set('millisecond', currentTime.millisecond())
          : undefined;
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
            from: item.stopDate[0] ? dayjs(stopDateFrom) : undefined,
            to: item.stopDate[1] ? dayjs(stopDateTo).endOf('day') : undefined,
          },
        };
      });
    const brokersAll = watchRouteOption !== 'routeMyTruck' ? ['coyote', 'dat', 'truck_stop'] : ['coyote', 'dat'];
    return {
      brokers: data.broker === 'all' ? brokersAll : [data.broker],
      isReturnOrigin: data.isReturnOrigin,
      stopPoints,
      equipmentType: data.equipmentTypes?.length > 0 ? data.equipmentTypes[0] : '',
    };
  };
  const handleViewDetailRoute = (id: string) => {
    setDetailRoute(routes.find((route) => route.id === id));
  };

  const watchRouteOption = methods.watch('routeOption');
  const handleChangeRouteOverview = useCallback(
    (id: string, data: RouteInfo[]) => {
      const selectRoute = data.find((route) => route.id === id);
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
    [setPoints],
  );

  const onSubmit = async (submitData: any) => {
    try {
      setIsLoading(true);
      setRoutes((prevState) => []);
      const requestData = transformData(submitData);
      if (requestData.stopPoints.length < 2) {
        toast('The position is not accurate; we need at least a starting point and an endpoint. ', { type: 'error' });
        return;
      }

      const data = await getSearchLoad(requestData, watchRouteOption);

      let routesRs: RouteInfo[] = [];
      routesRs = data.map((route, index) => {
        const brokers = route.loads?.map((load) => load.broker);
        return { ...route, id: `${index}`, brokers };
      });
      setOriginalData(routesRs);

      routesRs = routesRs.filter((route) => {
        return route.type === watchRouteOption;
      });

      const lastDateTo = requestData.stopPoints[requestData.stopPoints.length - 1]?.stopDate?.to;
      if (lastDateTo) {
        const returnDate = dayjs(lastDateTo).format('MM/DD/YYYY');
        setReturnDate(returnDate);
      }
      routesRs = sortRoutes(routesRs);
      setRoutes(routesRs);
      if (routesRs.length > 0) {
        handleChangeRouteOverview(routesRs[0].id, routesRs);
      }
      if (routesRs.length === 0) {
        setNoDataDisplay('Can not found suitable route for your search criteria');
      } else {
        setNoDataDisplay('');
      }
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

  const refreshData = useCallback(() => {
    setRoutes([]);
    setPoints([]);
  }, [setPoints]);

  useEffect(() => {
    if (watchRouteOption && originalData) {
      refreshData();
      let routeRs = originalData.filter((route) => route.type === watchRouteOption);
      routeRs = sortRoutes(routeRs);
      setRoutes(routeRs);
      if (routeRs.length > 0) {
        handleChangeRouteOverview(routeRs[0].id, routeRs);
      }
    }
  }, [handleChangeRouteOverview, originalData, refreshData, watchRouteOption]);

  useEffect(() => {
    if (watchRouteOption) {
      setNoDataDisplay('');
      switch (watchRouteOption) {
        case 'standard':
          methods.setValue('broker', 'all');
          break;
        case 'enRoute':
          methods.setValue('broker', 'all');
          break;
        case 'routeMyTruck':
          methods.setValue('broker', 'coyote');
          locations = locations.map((location) => ({ ...location, radius: 0 }));
          setLocations(locations);
          break;
        default:
          break;
      }
    }
  }, [methods, watchRouteOption]);

  const sortRoutes = useCallback(
    (routes: RouteInfo[]): RouteInfo[] => {
      const keyFunc = (route: RouteInfo) => {
        if (sortType === 'mile') {
          return route.distance;
        } else if (sortType === 'rate') {
          return route.amount;
        }
        return route.amount;
      };

      const sortedRoutes = routes.slice().sort((a, b) => {
        const keyA = keyFunc(a);
        const keyB = keyFunc(b);
        if (keyA === undefined || keyB === undefined) return 0;
        return sortCondition ? keyA - keyB : keyB - keyA;
      });

      return sortedRoutes;
    },
    [sortCondition, sortType],
  );

  useEffect(() => {
    const shouldSortRoutes = () => {
      return (
        routes.length > 0 &&
        (sortCondition !== routesRef.current.currentSortCondition || sortType !== routesRef.current.currentSortType)
      );
    };

    if (shouldSortRoutes()) {
      const newRoutes = sortRoutes(routes);
      routesRef.current = {
        routes: newRoutes,
        currentSortCondition: sortCondition,
        currentSortType: sortType,
      };

      setRoutes(newRoutes);
      handleChangeRouteOverview(newRoutes[0].id, newRoutes);
    }
  }, [handleChangeRouteOverview, routes, sortCondition, sortRoutes, sortType]);

  return (
    <>
      {isOpenDetail && detailRoute && selectedRoute ? (
        <DetailRoute handleOpenDetail={handleOpenDetail} item={selectedRoute} locations={locations} />
      ) : (
        <>
          <Form methods={methods as any} className={'p-10 pl-10 pr-5 pt-2'}>
            <div className="flex flex-wrap justify-between">
              <Form.Radio
                name="routeOption"
                options={[
                  { value: 'standard', label: 'Standard' },
                  { value: 'enRoute', label: 'En Route' },
                  { value: 'routeMyTruck', label: 'Route my truck' },
                ]}
                customClass="py-5"
              />
              <div className="flex flex-wrap items-center gap-5 pb-5 xl:gap-10 xl:pb-0">
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
                  title="Shipment booked on this route. No additional search needed."
                  color={'#393978'}
                  key={'full-tooltip'}
                >
                  <div className="flex items-center">
                    <FullTruckIcon className="h-6 w-6" /> <span className="text-sm"> Full</span>
                  </div>
                </Tooltip>
              </div>
            </div>

            <FreightSearch setLocations={setLocations} refreshData={refreshData} routeOption={watchRouteOption} />

            <div className="flex cursor-pointer items-center justify-between text-[16px] font-normal">
              <span className="flex items-center justify-between text-[#393978]" onClick={toggleCollapseAdvanceForm}>
                {isOpenAdvanced ? 'Hide advanced options' : 'View advanced options'} &nbsp;
                <ChevronDownIcon
                  className={cn('h-4 w-4 origin-center font-bold', { 'rotate-180 transform': isOpenAdvanced })}
                />
              </span>
            </div>

            {isOpenAdvanced && <AdvancedOptions routeOption={watchRouteOption} />}

            <div className="flex justify-end py-5">
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

          {isEnableRouteOverview && routes.length === 0 && !isLoading && noDataDisplay && (
            <div className="flex justify-center p-5">{noDataDisplay}</div>
          )}

          {isEnableRouteOverview && routes.length > 0 && (
            <>
              <div className="border- ml-5 mr-5 flex items-center justify-between border-b-2 border-[#F16521]/50 pb-3">
                <div className="text-lg text-[#F16521]">{routes.length} routes</div>
                <div className="flex items-center">
                  <span className="text-sm">Sort by: &nbsp;</span>
                  <Select
                    defaultValue="rate"
                    style={{ width: 120 }}
                    onChange={(value) => setSortType(value)}
                    options={[
                      { value: 'rate', label: 'Rate' },
                      { value: 'mile', label: 'Mile' },
                    ]}
                  />
                  <div className="cursor-pointer" onClick={() => setSortCondition((prevState) => !prevState)}>
                    {sortCondition ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
                  </div>
                </div>
              </div>
              <RouteOverview
                setIsOpenDetail={setIsOpenDetail}
                routes={routes}
                handleViewDetailRoute={handleViewDetailRoute}
                handleChangeRouteOverview={handleChangeRouteOverview}
                selectedRouteId={selectedRoute?.id || ''}
                returnDate={returnDate}
              />
            </>
          )}
        </>
      )}

      <ToastContainer />
    </>
  );
};

export default MainSearch;
