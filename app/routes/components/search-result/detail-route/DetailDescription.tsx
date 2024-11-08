import { type LoadBase } from '@/types/load';
import dayjs from 'dayjs';

interface DetailDescriptionProps {
  load: LoadBase;
}

const convertDate = (dateTime: string) => {
  if (dateTime !== 'DAILY') {
    if (dayjs(dateTime).isValid()) {
      return dayjs(dateTime).format('MM/DD/YYYY HH:mm');
    } else {
      return dateTime;
    }
  } else {
    return 'DAILY';
  }
};

const DetailDescription = ({ load }: DetailDescriptionProps) => {
  let count = 1;
  const items = [];
  if (load.pickupStop.address) {
    items.push({
      key: `${count}`,
      label: 'Pick Up',
      children: load.pickupStop.address,
    });
    count += 1;
  }
  if (load.pickupStop?.appointment?.startTime || load.pickupStop?.appointment?.endTime) {
    let dateString = '';
    if (load.pickupStop.appointment?.startTime) {
      dateString += convertDate(load.pickupStop.appointment.startTime);
    }
    if (load.pickupStop.appointment?.endTime) {
      dateString += ' - ' + convertDate(load.pickupStop.appointment.endTime);
    }
    items.push({
      key: `${count}`,
      label: 'Pick Up Time',
      children: dateString,
    });
    count += 1;
  }
  if (load.deliveryStop.address) {
    items.push({
      key: `${count}`,
      label: 'Delivery',
      children: load.deliveryStop.address,
    });
    count += 1;
  }

  if (load.deliveryStop.appointment?.startTime || load.deliveryStop?.appointment?.endTime) {
    let dateString = '';
    if (load.deliveryStop.appointment?.startTime) {
      dateString += convertDate(load.deliveryStop.appointment.startTime);
    }
    if (load.deliveryStop.appointment?.endTime) {
      dateString += ' - ' + convertDate(load.deliveryStop.appointment.endTime);
    }
    items.push({
      key: `${count}`,
      label: 'Delivery Time',
      children: dateString,
    });
    count += 1;
  }

  if (load.equipmentType) {
    items.push({
      key: `${count}`,
      label: 'Equipment Type',
      children: load.equipmentType,
    });
    count += 1;
  }
  if (load.weight) {
    items.push({
      key: `${count}`,
      label: 'Weight',
      children: `${load.weight} ${load.weightUnit || 'Pounds'}`,
    });
    count += 1;
  }
  if (load.length) {
    items.push({
      key: `${count}`,
      label: 'Length',
      children: `${load.length} ${load.lengthUnit || 'Feet'}`,
    });
    count += 1;
  }

  if (load.width) {
    items.push({
      key: `${count}`,
      label: 'Width',
      children: `${load.width} ${load.widthUnit || 'Feet'}`,
    });
    count += 1;
  }
  if (load.height) {
    items.push({
      key: `${count}`,
      label: 'Height',
      children: `${load.height} ${load.heightUnit || 'Feet'}`,
    });
    count += 1;
  }

  if (load.pickupStop.notes) {
    items.push({
      key: `${count}`,
      label: 'Pick up notes',
      children: load.pickupStop.notes,
      span: 2,
    });
    count += 1;
  }

  if (load.deliveryStop.notes) {
    items.push({
      key: `${count}`,
      label: 'Delivery notes',
      children: load.deliveryStop.notes,
      span: 2,
    });
  }

  return (
    <div className="px-6 py-3 text-base text-[#2E2F44]">
      {items.map((item) => (
        <div key={item.key} className="pb-4">
          <span className="text-sm text-[#00000073] after:me-2 after:ms-[2px] after:content-[':']">{item.label}</span>
          <span className="break-words text-sm text-[#000000e0]">{item.children}</span>
        </div>
      ))}
    </div>
  );
};
export default DetailDescription;
