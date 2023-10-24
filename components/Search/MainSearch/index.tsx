import { Form } from '@/components/common/Form';
import LocationSearch from '@/components/Search/LocationSearch';
import { type LocationBase, type SearchForm } from '@/types/search';
import { useForm } from 'react-hook-form';
import Button from '@/components/common/Button';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import AdvancedForm from '@/components/Search/MainSearch/AdvancedForm';
import RouteOverview from '@/components/RouteOverview';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface MainSearchProps {
  setIsOpenDetail: (isOpen: boolean) => void;
  setLocations: (location: LocationBase[]) => void;
}
const MainSearch = ({ setIsOpenDetail, setLocations }: MainSearchProps) => {
  const [isOpenAdvanced, setIsOpenAdvanced] = useState(false);
  const [isEnableRouteOverview, setIsEnableRouteOverview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<SearchForm>({
    defaultValues: {
      locations: {
        source: {
          address: '',
          startDate: '',
          endDate: '',
          radius: 0,
          coordinate: {
            latitude: 0,
            longitude: 0,
          },
        },
        destination: {
          address: '',
          startDate: '',
          endDate: '',
          radius: 0,
          coordinate: {
            latitude: 0,
            longitude: 0,
          },
        },
      },
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
    const { source, destination } = data.locations;
    return {
      from: {
        latitude: source.coordinate.latitude,
        longitude: source.coordinate.longitude,
      },
      to: {
        latitude: destination.coordinate.latitude,
        longitude: destination.coordinate.longitude,
      },
    };
  };
  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      console.log('data:', data);
      const requestData = transformData(data);
      const { data: result } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/loads/available`, requestData);
      console.log('result: ', result);
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
  const sourceAddress = methods.watch('locations.source.address');
  const destinationAddress = methods.watch('locations.destination.address');
  const sourceRadius = methods.watch('locations.source.radius');
  const destinationRadius = methods.watch('locations.destination.radius');
  useEffect(() => {
    const tempLocations = [];
    if (sourceAddress) {
      const source = methods.getValues('locations.source');
      tempLocations.push(source);
    }
    if (destinationAddress) {
      const destination = methods.getValues('locations.destination');
      tempLocations.push(destination);
    }
    setLocations(tempLocations);
  }, [sourceAddress, destinationAddress, methods, setLocations, sourceRadius, destinationRadius]);
  return (
    <>
      <Form methods={methods as any}>
        <LocationSearch />
        <div className="flex items-center justify-between p-5 text-[16px] font-normal">
          <Form.Checkbox name="returnToOrigin" label="Return to origin after delivery" />
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
            internalHref={'/truck-routing'}
            onClick={methods.handleSubmit(onSubmit)}
            loading={isLoading}
            disabled={isLoading}
          >
            &nbsp; <MagnifyingGlassIcon className="h-5 w-5 text-white" />
          </Button>
        </div>
      </Form>
      {isEnableRouteOverview && <RouteOverview setIsOpenDetail={setIsOpenDetail} />}
      <ToastContainer />
    </>
  );
};
export default MainSearch;
