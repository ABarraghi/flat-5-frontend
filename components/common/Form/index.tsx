import { Form as HeadlessForm, type Props as HeadlessFromProps } from './Form';
import { FormText } from '@/components/common/Form/Types/Text';
import { FormDateRangePicker } from '@/components/common/Form/Types/DateRangePicker';
import { FormInputNumber } from '@/components/common/Form/Types/InputNumber';
import { FormCheckbox } from '@/components/common/Form/Types/Checkbox';
import { FormRadio } from '@/components/common/Form/Types/RadioGroup';
import CustomDate from '@/components/common/Form/Types/CustomDate';
import { FormSelect } from '@/components/common/Form/Types/Select';

export type FormProps = HeadlessFromProps<any>;
export const Form = (props: FormProps) => <HeadlessForm {...props} />;

Form.Text = FormText;
Form.DateRangePicker = FormDateRangePicker;
Form.InputNumber = FormInputNumber;
Form.Checkbox = FormCheckbox;
Form.Radio = FormRadio;
Form.CustomDate = CustomDate;
Form.Select = FormSelect;
