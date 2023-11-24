import { useFieldArray, useFormContext } from 'react-hook-form';
import LocationItemNew from '@/components/Search/LocationSearch/LocationItem/LocationItemNew';
import { PlusOutlined } from '@ant-design/icons';
import { type Dispatch, type SetStateAction, useCallback } from 'react';

interface FreightSearchProps {
  setLocations: Dispatch<SetStateAction<any>>;
  refreshData: () => void;
}
const FreightSearch = ({ setLocations, refreshData }: FreightSearchProps) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'freights',
    rules: {
      minLength: 2,
    },
  });
  const appendFreight = useCallback(() => {
    append(
      [
        {
          title: '',
          location: {
            coordinate: { latitude: 0, longitude: 0 },
            city: '',
            state: '',
            country: '',
            postCode: '',
            address: '',
          },
          radius: 0,
          stopDate: null,
          isPickedLoad: false,
        },
      ],
      { shouldFocus: false },
    );
    refreshData();
  }, [append, refreshData]);
  const handleRemove = (index: number) => {
    if (fields.length > 2) {
      remove(index);
      refreshData();
    }
  };
  return (
    <>
      <ul>
        {fields.map((item, index) => (
          <li key={index}>
            <LocationItemNew
              index={index}
              remove={handleRemove}
              name="freights"
              setLocations={setLocations}
              length={fields.length}
            />
          </li>
        ))}
      </ul>
      <div className="flex cursor-pointer items-center gap-3 py-5" onClick={appendFreight}>
        <div className="flex h-10 w-10 flex-none flex-wrap items-center justify-center rounded-full bg-[#F2F2F7]">
          <PlusOutlined className="text-[#393978]" />
        </div>
        <span className="text-md font-semibold text-[#393978]">Add My Freight</span>
      </div>
    </>
  );
};
export default FreightSearch;
