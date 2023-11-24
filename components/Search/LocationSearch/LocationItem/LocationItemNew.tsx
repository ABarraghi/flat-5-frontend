import { Form } from '@/components/common/Form';
import dynamic from 'next/dynamic';
import { DeleteFilled, LockFilled } from '@ant-design/icons';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { type MapLocation, UpperCaseAlphabet } from '@/types/common';
import { type FreightBase } from '@/types/search';
import EmptyTruckIcon from '@/components/common/icons/EmptyTruckIcon';
import FullTruckIcon from '@/components/common/icons/FullTruckIcon';
const MapboxSuggestion = dynamic(() => import('@/components/MapboxSuggestion'), {
  ssr: false,
});

interface LocationItemNewProps {
  name: string;
  index: number;
  remove: (value: number) => void;
  setLocations: Dispatch<SetStateAction<any>>;
  length: number;
}

const SuffixRadius = () => {
  return <span className="text-[12px] text-[#2E2F44] opacity-50">mi</span>;
};

const LocationItem = ({ name, index, remove, setLocations, length }: LocationItemNewProps) => {
  const {
    watch,
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
  const handleRemove = (index: number) => {
    remove(index);
    const freights = getValues('freights');
    const locations: MapLocation[] = [];
    freights.forEach((freight: FreightBase) => {
      if (
        freight?.location.coordinate &&
        freight.location.coordinate.latitude !== 0 &&
        freight.location.coordinate.longitude !== 0
      ) {
        const location = {
          address: freight.location.address,
          coordinate: {
            longitude: freight.location.coordinate.longitude,
            latitude: freight.location.coordinate.latitude,
          },
          title: freight?.title,
          radius: freight.radius,
        };
        locations.push(location as MapLocation);
      }
    });
    setLocations(locations);
  };
  useEffect(() => {
    const freights = getValues('freights');
    const locations: MapLocation[] = [];
    freights.forEach((freight: FreightBase) => {
      if (
        freight?.location.coordinate &&
        freight.location.coordinate.latitude !== 0 &&
        freight.location.coordinate.longitude !== 0
      ) {
        const location = {
          address: freight.location.address,
          coordinate: {
            longitude: freight.location.coordinate.longitude,
            latitude: freight.location.coordinate.latitude,
          },
          title: freight?.title,
          radius: freight.radius,
        };
        locations.push(location as MapLocation);
      }
    });
    setLocations(locations);
  }, [latitude, getValues, radius, setLocations, routeOptionWatch]);
  const isPickedLoad = watch(`${name}.${index}.isPickedLoad`);
  const togglePickLoad = () => {
    const currentPickedLoadStatus = getValues(`${name}.${index}.isPickedLoad`);
    setValue(`${name}.${index}.isPickedLoad`, !currentPickedLoadStatus);
  };
  return (
    <>
      <div className="my-2 flex w-full flex-wrap items-center gap-3">
        <div
          className="flex h-10 w-10 flex-none cursor-pointer flex-wrap items-center justify-center rounded-full bg-[#393978] hover:bg-[#C4C4D7]"
          onClick={() => handleRemove(index)}
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
            error={(errors[`${name}`] as any)?.[`${index}`]?.location?.address?.message as string}
          />
          <Form.DateRangePicker
            name={`${name}.${index}.stopDate`}
            label="Name"
            placeholder="Name"
            required
            customClass="w-full"
            error={(errors[`${name}`] as any)?.[`${index}`]?.stopDate?.message as string}
            rules={{ required: 'Required' }}
          />
          <Form.InputNumber
            name={`${name}.${index}.radius`}
            label="Radius"
            placeholder="Radius"
            rules={{ required: 'Required', min: { value: 1, message: 'Required' } }}
            suffix={<SuffixRadius />}
            customClass="w-full max-w-[150px]"
            isDebounce={true}
            error={(errors[`${name}`] as any)?.[`${index}`]?.radius?.message as string}
            timeDebounce={1000}
          />
        </div>
        {index < length - 1 && (
          <div className="flex w-full cursor-pointer" onClick={togglePickLoad}>
            {isPickedLoad ? <FullTruckIcon /> : <EmptyTruckIcon />}
          </div>
        )}
      </div>
    </>
  );
};

export default LocationItem;
