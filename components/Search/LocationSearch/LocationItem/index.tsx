import { Form } from '@/components/common/Form';
import dynamic from 'next/dynamic';
const MapboxSuggestion = dynamic(() => import('@/components/MapboxSuggestion'), {
  ssr: false,
});

interface LocationItemProps {
  name?: string;
  index?: string;
  remove?: (value: string) => void;
}

const SuffixRadius = () => {
  return <span className="text-[12px] text-[#2E2F44] opacity-50">mi</span>;
};
const LocationItem = ({ name, index, remove }: LocationItemProps) => {
  return (
    <>
      <div className="my-2 flex w-full gap-2">
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#393978]">
          <span className="text-[16px] font-normal text-white">A</span>
        </div>
        <div className="flex flex-1 gap-2">
          <MapboxSuggestion name="locations.source" />
          <Form.DateRangePicker
            name="locations.source.startDate"
            label="Name"
            placeholder="Name"
            required
            customClass="w-full"
          ></Form.DateRangePicker>
          <Form.InputNumber
            name="locations.source.radius"
            label="Radius"
            placeholder="Radius"
            required
            suffix={<SuffixRadius />}
            customClass="w-full max-w-[150px]"
          ></Form.InputNumber>
        </div>
      </div>
      <div className="my-2 flex w-full gap-2">
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#393978]">
          <span className="text-[16px] font-normal text-white">B</span>
        </div>
        <div className="flex flex-1 gap-2">
          <MapboxSuggestion name="locations.destination" />
          <Form.DateRangePicker
            name="locations.destination.startDate"
            label="Name"
            placeholder="Name"
            required
            customClass="w-full"
          ></Form.DateRangePicker>
          <Form.InputNumber
            name="locations.destination.radius"
            label="Radius"
            placeholder="Radius"
            required
            suffix={<SuffixRadius />}
            customClass="w-full max-w-[150px]"
          ></Form.InputNumber>
        </div>
      </div>
    </>
  );
};

export default LocationItem;
