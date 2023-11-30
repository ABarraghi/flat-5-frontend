import DistanceIcon from '@/components/common/icons/DistanceIcon';
import { DollarCircleFilled } from '@ant-design/icons';
import { formatDistance, formatUsPrice } from '@/utils/common';
import cn from 'classnames';

interface PriceAndDistanceProps {
  price: number;
  distance: number;
  customClass?: string;
  isMock?: boolean;
}
const PriceAndDistance = ({ price, distance, customClass }: PriceAndDistanceProps) => {
  return (
    <div className={cn('flex items-center ', customClass || 'text-20')}>
      <div className={cn('price font-bold')}>
        <DollarCircleFilled />
        <span className="ml-2">${formatUsPrice(price)}</span>
      </div>
      <div className={cn('distance flex items-center')}>
        <DistanceIcon />
        <span className="ml-2 font-light">{formatDistance(distance)} mi</span>
      </div>
    </div>
  );
};

export default PriceAndDistance;
