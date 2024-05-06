import Image from 'next/image';
import cn from 'classnames';

interface CarrierLogoProps {
  name: string;
  classNames?: string;
}

const CARRIER_LOGOS = [
  {
    name: 'coyote',
    url: '/images/coyote.svg',
  },
  {
    name: 'truck_stop',
    url: '/images/ts_waypoint-red.svg',
  },
  {
    name: 'dat',
    url: '/images/DAT-Logo.svg',
  },
];

const CarrierLogo = ({ name, classNames = '' }: CarrierLogoProps) => {
  const logo = CARRIER_LOGOS.find((logo) => logo.name === name);

  return (
    <div className="ml-1 flex flex-none flex-wrap rounded-xl">
      <Image
        className={cn(classNames || 'h-6 w-6')}
        src={logo?.url || '/images/coyote.svg'}
        width={134}
        height={40}
        alt={name}
      ></Image>
    </div>
  );
};

export default CarrierLogo;
