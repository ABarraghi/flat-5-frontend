import TagList from '@/components/TaskList';
import {
  EQUIPMENT_TYPES,
  type EquipmentType,
  SHIPMENT_FORMATS,
  type ShipmentFormat,
  SPECIAL_NOTES,
  type SpecialNote,
} from '@/types/search';
import { useFormContext } from 'react-hook-form';
import { toggleSelectingItem } from '@/utils/common';

const AdvancedForm = () => {
  const { setValue, watch } = useFormContext();
  const equipmentTypes = watch('equipmentTypes');
  const specialNotes = watch('specialNotes');
  const shipmentFormats = watch('shipmentFormats');
  const handleChangeEquipmentTypes = (value: string) => {
    setValue('equipmentTypes', toggleSelectingItem(equipmentTypes, value, false));
  };
  const handleChangeSpecialNotes = (value: string) => {
    setValue('specialNotes', toggleSelectingItem(specialNotes, value, true));
  };
  const handleChangeShipmentFormats = (value: string) => {
    setValue('shipmentFormats', toggleSelectingItem(shipmentFormats, value, false));
  };
  return (
    <div className="px-5 py-10 text-[16px] font-normal">
      <TagList<EquipmentType>
        label="Equipment Type"
        selectedTags={equipmentTypes}
        tags={EQUIPMENT_TYPES}
        onTagChange={handleChangeEquipmentTypes}
      />
      <TagList<SpecialNote>
        label="Specials Notes"
        selectedTags={specialNotes}
        tags={SPECIAL_NOTES}
        onTagChange={handleChangeSpecialNotes}
      />
      <TagList<ShipmentFormat>
        label="Shipment Format"
        selectedTags={shipmentFormats}
        tags={SHIPMENT_FORMATS}
        onTagChange={handleChangeShipmentFormats}
      />
    </div>
  );
};

export default AdvancedForm;
