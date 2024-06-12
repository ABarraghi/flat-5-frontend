import TagList from '@/app/routes/components/search-form/TagList';
import {
  EQUIPMENT_TYPES,
  type EquipmentType,
  // SHIPMENT_FORMATS,
  // type ShipmentFormat,
  // SPECIAL_NOTES,
  // type SpecialNote,
} from '@/types/search';
import { useFormContext } from 'react-hook-form';
import { toggleSelectingItem } from '@/utils/common';
import { Form } from '@/components/common/Form';

interface AdvancedFormProps {
  routeOption: string;
}

const AdvancedOptions = ({ routeOption }: AdvancedFormProps) => {
  const { setValue, watch } = useFormContext();
  const equipmentTypes = watch('equipmentTypes');
  // const specialNotes = watch('specialNotes');
  // const shipmentFormats = watch('shipmentFormats');

  const handleChangeEquipmentTypes = (value: string) => {
    setValue('equipmentTypes', toggleSelectingItem(equipmentTypes, value, false, true));
  };

  // const handleChangeSpecialNotes = (value: string) => {
  //   setValue('specialNotes', toggleSelectingItem(specialNotes, value, true, false));
  // };

  // const handleChangeShipmentFormats = (value: string) => {
  //   setValue('shipmentFormats', toggleSelectingItem(shipmentFormats, value, false, false));
  // };

  return (
    <div className="py-10 text-[16px] font-normal">
      <div className="pb-5 text-[10px] font-bold tracking-[5%] text-black/50 lg:text-[16px]">
        <span className="text-[10px] uppercase text-[#2E2F44] opacity-50 lg:text-[12px]">Brokers</span>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 ">
        <Form.Select
          name="broker"
          defaultValue={routeOption === 'routeMyTruck' ? 'coyote' : 'all'}
          customClass="w-[200px]"
          options={
            routeOption === 'routeMyTruck'
              ? [
                  { key: 'coyote', label: 'Coyote Only' },
                  { key: 'dat', label: 'Dat Only' },
                ]
              : [
                  { key: 'all', label: 'All' },
                  { key: 'coyote', label: 'Coyote Only' },
                  { key: 'dat', label: 'Dat Only' },
                  { key: 'truck_stop', label: 'TruckStop Only' },
                ]
          }
        />
        {routeOption !== 'routeMyTruck' && <Form.Checkbox name="isReturnOrigin" label="Return origin data" />}
      </div>
      <TagList<EquipmentType>
        label="Equipment Type"
        selectedTags={equipmentTypes}
        tags={EQUIPMENT_TYPES}
        onTagChange={handleChangeEquipmentTypes}
      />
      {/* <TagList<SpecialNote> */}
      {/*  label="Specials Notes" */}
      {/*  selectedTags={specialNotes} */}
      {/*  tags={SPECIAL_NOTES} */}
      {/*  onTagChange={handleChangeSpecialNotes} */}
      {/* /> */}
      {/* <TagList<ShipmentFormat> */}
      {/*  label="Shipment Format" */}
      {/*  selectedTags={shipmentFormats} */}
      {/*  tags={SHIPMENT_FORMATS} */}
      {/*  onTagChange={handleChangeShipmentFormats} */}
      {/* /> */}
    </div>
  );
};

export default AdvancedOptions;
