import Image from 'next/image';
import CoyoteLogo from 'public/images/coyote.svg';
import LandStarLogo from 'public/images/land-star.svg';
import cn from 'classnames';

interface CarrierLogoProps {
  name: string;
  classNames?: string;
}

const CARRIER_LOGOS = [
  {
    name: 'land-star',
    url: LandStarLogo,
  },
  {
    name: 'coyote',
    url: CoyoteLogo,
  },
];
const CarrierLogo = ({ name, classNames = '' }: CarrierLogoProps) => {
  const logo = CARRIER_LOGOS.find((logo) => logo.name === name);
  return (
    <div className="rounded-xl">
      <Image className={cn(classNames || 'h-6 w-6')} src={logo?.url || CoyoteLogo} alt={name}></Image>
    </div>
  );
};
export default CarrierLogo;
