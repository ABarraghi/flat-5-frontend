import { Form } from '@/components/common/Form';
import LocationSearch from '@/components/Search/LocationSearch';
import { type FreightBase, type LocationBase, type SearchForm } from '@/types/search';
import { useForm } from 'react-hook-form';
import Button from '@/components/common/Button';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import cn from 'classnames';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import AdvancedForm from '@/components/Search/MainSearch/AdvancedForm';
import RouteOverview from '@/components/RouteOverview';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { type Route } from '@/types/load';
import DetailRoute from '@/components/DetailRoute';
import FreightSearch from '@/components/Search/LocationSearch/FreightSearch';

interface MainSearchProps {
  setLocations: Dispatch<SetStateAction<any>>;
  setPoints: Dispatch<SetStateAction<any>>;
  locations: LocationBase[];
}
const MainSearch = ({ setLocations, setPoints, locations }: MainSearchProps) => {
  const [isOpenAdvanced, setIsOpenAdvanced] = useState(false);
  const [isEnableRouteOverview, setIsEnableRouteOverview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [routes, setRoutes] = useState<Route[]>([]);

  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [detailRoute, setDetailRoute] = useState<Route>();
  const [selectedRoute, setSelectedRoute] = useState<Route>();
  const handleOpenDetail = (isOpen: boolean) => {
    setIsOpenDetail(isOpen);
  };

  const methods = useForm<SearchForm>({
    defaultValues: {
      freights: [
        {
          title: '',
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
          stopDate: {
            from: '',
            to: '',
          },
        },
        {
          title: '',
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
          stopDate: {
            from: '',
            to: '',
          },
        },
      ],
      returnToOrigin: true,
      routeOption: 'route_my_truck',
      equipmentTypes: [],
      specialNotes: [],
      shipmentFormats: [],
    },
  });
  const toggleCollapseAdvanceForm = () => {
    setIsOpenAdvanced((state) => !state);
  };
  const transformData = (data: any) => {
    const stopPoints = data.freights
      .filter((item) => {
        return (
          (item.location.coordinate.latitude && item.location.coordinate.longitude) ||
          item.location.city ||
          item.location.state ||
          item.location.country
        );
      })
      .map((item) => {
        console.log('item: ', item);
        return {
          location: {
            coordinate: {
              latitude: item.location.coordinate.latitude,
              longitude: item.location.coordinate.longitude,
            },
            city: item.location.city !== '' ? item.location.city : undefined,
            state: item.location.state !== '' ? item.location.state : undefined,
            country: item.location.country !== '' ? item.location.country : undefined,
          },
          radius: item.radius ? parseInt(item.radius) : 0,
          stopDate: {
            from: item.stopDate[0] ? item.stopDate[0] : undefined,
            to: item.stopDate[1] ? item.stopDate[1] : undefined,
          },
        };
      });
    return {
      stopPoints,
      equipmentType: 'VR',
    };
    // return {
    //   from: {
    //     latitude: source.coordinate.latitude,
    //     longitude: source.coordinate.longitude,
    //     state: source.regionCode,
    //     country: source.countryCode,
    //     range: source.radius,
    //   },
    //   to: {
    //     latitude: destination.coordinate.latitude,
    //     longitude: destination.coordinate.longitude,
    //     state: destination.regionCode,
    //     country: destination.countryCode,
    //     range: destination.radius,
    //   },
    // };
  };
  const handleViewDetailRoute = (id: string) => {
    setDetailRoute(routes.find((route) => route.id === id));
  };

  const onSubmit = async (data: any) => {
    try {
      console.log('data: ', data);
      setIsLoading(true);
      setRoutes((prevState) => []);
      const requestData = transformData(data);
      console.log('==========');
      console.log('requestData: ', requestData);
      if (requestData.stopPoints.length < 2) {
        toast('The position is not accurate; we need at least a starting point and an endpoint. ', { type: 'error' });
        return;
      }
      const { data: result } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/loads/available`, requestData);

      const routesRs: Route[] = [];
      if (result.data.length > 0) {
        const obj1: Route = {
          id: '1',
          totalAmount: 5540,
          totalDistance: 2232,
          loads: result.data,
          isSelected: false,
        };
        routesRs.push(obj1);
        const obj2: Route = {
          id: '2',
          totalAmount: 4125,
          totalDistance: 2057,
          // loads: result.data,
          loads: [],
          isSelected: false,
        };
        routesRs.push(obj2);
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
            <FreightSearch setLocations={setLocations} />
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
          {isEnableRouteOverview && routes.length === 0 && <div>Can not found suitable route </div>}
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
