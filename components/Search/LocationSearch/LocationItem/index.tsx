import { Form } from '@/components/common/Form';
import { Space } from 'antd';
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
      <div className="m-3 flex flex-col">
        <Space size={12} className="my-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#393978]">
            <span className="text-[16px] font-normal text-white">A</span>
          </div>
          <Form.Text
            name="locations.source.address"
            label="Name"
            placeholder="Enter Location"
            required
            showMapIcon
          ></Form.Text>
          <Form.DateRangePicker
            name="locations.source.startDate"
            label="Name"
            placeholder="Name"
            required
          ></Form.DateRangePicker>
          <Form.InputNumber
            name="locations.source.radius"
            label="Radius"
            placeholder="Radius"
            required
            suffix={<SuffixRadius />}
          ></Form.InputNumber>
        </Space>
        <Space size={12} className="my-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#393978]">
            <span className="text-[16px] font-normal text-white">B</span>
          </div>
          <Form.Text
            name="locations.destination.address"
            label="Name"
            placeholder="Enter Location"
            required
            showMapIcon
          ></Form.Text>
          <Form.DateRangePicker
            name="locations.destination.startDate"
            label="Name"
            placeholder="Name"
            required
          ></Form.DateRangePicker>
          <Form.InputNumber
            name="locations.destination.radius"
            label="Radius"
            placeholder="Radius"
            required
            suffix={<SuffixRadius />}
          ></Form.InputNumber>
        </Space>
      </div>
    </>
  );
};

export default LocationItem;
