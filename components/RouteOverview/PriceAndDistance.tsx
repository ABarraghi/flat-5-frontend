import DistanceIcon from '@/components/common/icons/DistanceIcon';
import { DollarCircleFilled } from '@ant-design/icons';
import { formatUsPrice } from '@/utils/common';
import cn from 'classnames';

interface PriceAndDistanceProps {
  price: number;
  distance: number;
  customClass?: string;
  isMock?: boolean;
}
const PriceAndDistance = ({ price, distance, customClass, isMock = true }: PriceAndDistanceProps) => {
  return (
    <div className={cn('flex items-center justify-center', customClass || 'text-20')}>
      <div className={cn('price font-bold', isMock ? 'mock-data' : '')}>
        <DollarCircleFilled />
        <span className="ml-2">${formatUsPrice(price)}</span>
      </div>
      <div className={cn('distance ml-10 flex items-center', isMock ? 'mock-data' : '')}>
        <DistanceIcon />
        <span className="ml-2 font-light">{distance} mi</span>
      </div>
    </div>
  );
};

export default PriceAndDistance;
