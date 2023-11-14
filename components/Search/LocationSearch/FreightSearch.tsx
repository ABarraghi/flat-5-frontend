import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import LocationItemNew from '@/components/Search/LocationSearch/LocationItem/LocationItemNew';
import { PlusOutlined } from '@ant-design/icons';
import { type Dispatch, type SetStateAction, useCallback, useEffect } from 'react';

interface FreightSearchProps {
  setLocations: Dispatch<SetStateAction<any>>;
  setFreights: Dispatch<SetStateAction<any>>;
}
const FreightSearch = ({ setLocations, setFreights }: FreightSearchProps) => {
  const { control, getValues, watch, formState } = useFormContext();
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
        },
      ],
      { shouldFocus: false },
    );
  }, [append]);
  const handleRemove = (index) => {
    if (fields.length > 2) {
      remove(index);
    }
  };
  return (
    <>
      <ul>
        {fields.map((item, index) => (
          <li key={index}>
            <LocationItemNew index={index} remove={handleRemove} name="freights" setLocations={setLocations} />
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
