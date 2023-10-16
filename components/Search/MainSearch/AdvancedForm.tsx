import { Form } from '@/components/common/Form';
import TagList from '@/components/TaskList';
import { EQUIPMENT_TYPES, type EquipmentType } from '@/types/search';
import { useFormContext } from 'react-hook-form';
import { toggleSelectingItem } from '@/utils/common';

const AdvancedForm = () => {
  const { setValue, watch } = useFormContext();
  const equipmentTypes = watch('equipmentTypes');
  const handleChangeEquipmentTypes = (value: string) => {
    setValue('equipmentTypes', toggleSelectingItem(equipmentTypes, value));
  };
  return (
    <div className="mx-3 my-10">
      <Form.Checkbox className="mr-16" name="isIncludeEnRoute" label="Include en route" />
      <Form.Checkbox name="isRouteMyTruck" label="Route my truck" />
      <div className="">
        <TagList<EquipmentType>
          label="Equipment Type"
          selectedTags={equipmentTypes}
          tags={EQUIPMENT_TYPES}
          onTagChange={handleChangeEquipmentTypes}
        />
      </div>
    </div>
  );
};

export default AdvancedForm;
