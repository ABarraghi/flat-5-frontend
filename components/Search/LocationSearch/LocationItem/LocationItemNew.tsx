import { Form } from '@/components/common/Form';
import dynamic from 'next/dynamic';
import { DeleteFilled } from '@ant-design/icons';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
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
const UpperCaseAlphabet: string[] = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

const LocationItem = ({ name, index, remove, setLocations }: LocationItemNewProps) => {
  const { watch, control, getValues, setValue } = useFormContext();
  const [isShowDeleteIcon, setIsShowDeleteIcon] = useState(false);
  const title = UpperCaseAlphabet[index];

  const latitude = watch(`${name}.${index}.location.coordinate.latitude`);
  const radius = watch(`${name}.${index}.radius`);
  const updateLocations = (newLocations) => {
    setLocations(newLocations);
  };
  useEffect(() => {
    if (title) {
      setValue(`${name}.${index}.title`, title);
    }
  }, [index, name, setValue, title]);
  useEffect(() => {
    // setRoutes([]);
    // setPoints([]);
    // console.log('3333');
  }, [latitude]);
  useEffect(() => {
    const freights = getValues('freights');
    const locations = [];
    freights.forEach((freight) => {
      if (freight.latitude !== 0 && freight.location.coordinate.longitude !== 0) {
        const location = {
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
    updateLocations(locations);
  }, [latitude, getValues, radius]);
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
          <MapboxSuggestion name={`${name}.${index}.location`} />
          <Form.DateRangePicker
            name={`${name}.${index}.stopDate`}
            label="Name"
            placeholder="Name"
            required
            customClass="w-full"
          ></Form.DateRangePicker>
          <Form.InputNumber
            name={`${name}.${index}.radius`}
            label="Radius"
            placeholder="Radius"
            required
            suffix={<SuffixRadius />}
            customClass="w-full max-w-[150px]"
            isDebounce={true}
            timeDebounce={2000}
          ></Form.InputNumber>
        </div>
      </div>
    </>
  );
};

export default LocationItem;
