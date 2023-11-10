import DistanceIcon from '@/components/common/icons/DistanceIcon';
import { DollarCircleFilled } from '@ant-design/icons';
import { formatUsPrice } from '@/utils/common';
import cn from 'classnames';

interface PriceAndDistanceProps {
  price: number;
  distance: number;
  customClass?: string;
}
const PriceAndDistance = ({ price, distance, customClass }: PriceAndDistanceProps) => {
  return (
    <div className={cn('flex items-center justify-center', customClass || 'text-20')}>
      <div className="price mock-data font-bold">
        <DollarCircleFilled />
        <span className="ml-2">${formatUsPrice(price)}</span>
      </div>
      <div className="distance mock-data ml-10 flex items-center ">
        <DistanceIcon />
        <span className="ml-2 font-light">{distance} mi</span>
      </div>
    </div>
  );
};

export default PriceAndDistance;
