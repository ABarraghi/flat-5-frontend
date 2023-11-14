import { Form } from '@/components/common/Form';
import dynamic from 'next/dynamic';
import { DeleteFilled } from '@ant-design/icons';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { UpperCaseAlphabet } from '@/types/common';
const MapboxSuggestion = dynamic(() => import('@/components/MapboxSuggestion'), {
  ssr: false,
});

interface LocationItemNewProps {
  name?: string;
  index: number;
  remove: (value: number) => void;
  setLocations: Dispatch<SetStateAction<any>>;
}

const SuffixRadius = () => {
  return <span className="text-[12px] text-[#2E2F44] opacity-50">mi</span>;
};

const LocationItem = ({ name, index, remove, setLocations }: LocationItemNewProps) => {
  const {
    watch,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();
  const routeOptionWatch = watch('routeOption');
  const [isShowDeleteIcon, setIsShowDeleteIcon] = useState(false);
  const title = UpperCaseAlphabet[index];
  const latitude = watch(`${name}.${index}.location.coordinate.latitude`);
  const radius = watch(`${name}.${index}.radius`);
  useEffect(() => {
    if (title) {
      setValue(`${name}.${index}.title`, title);
    }
  }, [index, name, setValue, title]);
  useEffect(() => {
    // setRoutes([]);
    // setPoints([]);
    // console.lrouteOptionog('3333');
  }, [latitude]);
  useEffect(() => {
    const freights = getValues('freights');
    console.log(freights);
    const locations = [];
    freights.forEach((freight) => {
      if (freight.latitude !== 0 && freight.location.coordinate.longitude !== 0) {
        const location = {
          address: freight.location.address,
          coordinate: {
            longitude: freight.location.coordinate.longitude,
            latitude: freight.location.coordinate.latitude,
          },
          title: freight.title,
          radius: freight.radius,
        };
        locations.push(location);
      }
    });
    setLocations(locations);
  }, [latitude, getValues, radius, setLocations, routeOptionWatch]);
  return (
    <>
      <div className="my-2 flex w-full flex-wrap items-center gap-3">
        <div
          className="flex h-10 w-10 flex-none cursor-pointer flex-wrap items-center justify-center rounded-full bg-[#393978] hover:bg-[#C4C4D7]"
          onClick={() => (remove ? remove(index) : null)}
          onMouseEnter={() => setIsShowDeleteIcon(true)}
          onMouseLeave={() => setIsShowDeleteIcon(false)}
        >
          {isShowDeleteIcon ? (
            <DeleteFilled className="text-white" />
          ) : (
            <span className="text-[16px] font-semibold text-white">{title}</span>
          )}
        </div>
        <div className="flex flex-1 gap-2">
          <MapboxSuggestion
            name={`${name}.${index}.location`}
            rules={{ required: 'Required' }}
            error={errors[name]?.[index]?.location?.address?.message}
          />
          <Form.DateRangePicker
            name={`${name}.${index}.stopDate`}
            label="Name"
            placeholder="Name"
            required
            customClass="w-full"
            error={errors[name]?.[index]?.stopDate?.message}
            rules={{ required: 'Required' }}
          />
          {routeOptionWatch !== 'en_route' && (
            <Form.InputNumber
              name={`${name}[${index}].radius`}
              label="Radius"
              placeholder="Radius"
              rules={{ required: 'Required', min: { value: 1, message: 'Required' } }}
              suffix={<SuffixRadius />}
              customClass="w-full max-w-[150px]"
              isDebounce={true}
              error={errors[name]?.[index]?.radius?.message}
              timeDebounce={1000}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default LocationItem;
