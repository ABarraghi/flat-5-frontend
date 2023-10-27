import { useFieldArray, useFormContext } from 'react-hook-form';
import LocationItemNew from '@/components/Search/LocationSearch/LocationItem/LocationItemNew';
import { PlusCircleFilled, PlusOutlined } from '@ant-design/icons';
import { useCallback } from 'react';

const FreightSearch = () => {
  const { control } = useFormContext();
  const { fields, append, prepend, remove, swap, move, insert, replace } = useFieldArray({
    control,
    name: 'freights',
    rules: {
      minLength: 4,
    },
  });
  const appendFreight = useCallback(() => {
    append(
      {
        title: '',
        address: '',
        startDate: '',
        endDate: '',
        radius: 0,
        coordinate: { latitude: 0, longitude: 0 },
      },
      { shouldFocus: false },
    );
  }, []);
  return (
    <>
      <ul>
        {fields.map((item, index) => (
          <li key={index}>
            <LocationItemNew index={index} remove={remove} />
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-3 py-5">
        <div
          className="flex h-10 w-10 flex-none cursor-pointer flex-wrap items-center justify-center rounded-full bg-[#F2F2F7]"
          onClick={appendFreight}
        >
          <PlusOutlined className="text-[#393978]" />
        </div>
        <span className="text-md font-semibold text-[#393978]">Add My Freight</span>
      </div>
    </>
  );
};
export default FreightSearch;
