import { Form } from '@/components/common/Form';
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
    setValue('equipmentTypes', toggleSelectingItem(equipmentTypes, value));
  };
  const handleChangeSpecialNotes = (value: string) => {
    setValue('specialNotes', toggleSelectingItem(specialNotes, value));
  };
  const handleChangeShipmentFormats = (value: string) => {
    setValue('specialNotes', toggleSelectingItem(specialNotes, value));
  };
  return (
    <div className="mx-3 my-10">
      <Form.Checkbox className="mr-16" name="isIncludeEnRoute" label="Include en route" />
      <Form.Checkbox name="isRouteMyTruck" label="Route my truck" />
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
