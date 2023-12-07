import { useFieldArray, useFormContext } from 'react-hook-form';
import LocationItemNew from '@/components/Search/LocationSearch/LocationItem/LocationItemNew';
import { PlusOutlined } from '@ant-design/icons';
import { type Dispatch, type SetStateAction, useCallback } from 'react';

interface FreightSearchProps {
  setLocations: Dispatch<SetStateAction<any>>;
  refreshData: () => void;
  routeOption: string;
}
const FreightSearch = ({ setLocations, refreshData, routeOption }: FreightSearchProps) => {
  const { control } = useFormContext();
  const { fields, append, remove, insert } = useFieldArray({
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
  const handleInsertAt = (index: number) => {
    insert(index + 1, [
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
    ]);
    refreshData();
  };
  return (
    <>
      <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            <LocationItemNew
              index={index}
              remove={handleRemove}
              name="freights"
              setLocations={setLocations}
              length={fields.length}
              handleInsertAt={handleInsertAt}
              routeOption={routeOption}
            />
          </li>
        ))}
      </ul>
      <div className="flex w-fit cursor-pointer items-center gap-3 py-5" onClick={appendFreight}>
        <div className="flex h-10 w-10 flex-none flex-wrap items-center justify-center rounded-full bg-[#F2F2F7]">
          <PlusOutlined className="text-[#393978]" />
        </div>
        <span className="text-md font-semibold text-[#393978]">Add My Freight</span>
      </div>
    </>
  );
};
export default FreightSearch;
