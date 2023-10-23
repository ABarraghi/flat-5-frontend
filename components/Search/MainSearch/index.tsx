import { Form } from '@/components/common/Form';
import LocationSearch from '@/components/Search/LocationSearch';
import { type SearchForm } from '@/types/search';
import { useForm } from 'react-hook-form';
import Button from '@/components/common/Button';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import AdvancedForm from '@/components/Search/MainSearch/AdvancedForm';
import RouteOverview from '@/components/RouteOverview';

interface MainSearchProps {
  setIsOpenDetail: (isOpen: boolean) => void;
  setStartLocation: (location: number[]) => void;
  setEndLocation: (location: number[]) => void;
}
const MainSearch = ({ setIsOpenDetail, setStartLocation, setEndLocation }: MainSearchProps) => {
  const [isOpenAdvanced, setIsOpenAdvanced] = useState(false);
  const [isEnableRouteOverview, setIsEnableRouteOverview] = useState(false);
  const methods = useForm<SearchForm>({
    defaultValues: {
      locations: {
        source: {
          address: '',
          startDate: '',
          endDate: '',
          radius: '',
          coordinate: {
            latitude: 0,
            longitude: 0,
          },
        },
        destination: {
          address: '',
          startDate: '',
          endDate: '',
          radius: '',
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
  const onSubmit = (data: any) => {
    console.log('data:', data);
    setIsEnableRouteOverview(true);
    setIsOpenAdvanced(false);
  };
  const sourceAddress = methods.watch('locations.source.address');
  const destinationAddress = methods.watch('locations.destination.address');
  useEffect(() => {
    if (sourceAddress) {
      const source = methods.getValues('locations.source');
      setStartLocation([source.coordinate.longitude, source.coordinate.latitude]);
    }
    if (destinationAddress) {
      const destination = methods.getValues('locations.destination');
      setEndLocation([destination.coordinate.longitude, destination.coordinate.latitude]);
    }
  }, [sourceAddress, destinationAddress]);
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
          >
            &nbsp; <MagnifyingGlassIcon className="h-5 w-5 text-white" />
          </Button>
        </div>
      </Form>
      {isEnableRouteOverview && <RouteOverview setIsOpenDetail={setIsOpenDetail} />}
    </>
  );
};
export default MainSearch;
