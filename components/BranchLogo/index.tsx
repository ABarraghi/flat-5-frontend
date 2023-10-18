import Image from 'next/image';
import CoyoteLogo from 'public/images/coyote.svg';
import LandStarLogo from 'public/images/land-star.svg';

interface BranchLogoProps {
  name: string;
}

const BRAND_LOGOS = [
  {
    name: 'land-star',
    url: LandStarLogo,
  },
  {
    name: 'coyote',
    url: CoyoteLogo,
  },
];
const BranchLogo = ({ name }: BranchLogoProps) => {
  const logo = BRAND_LOGOS.find((logo) => logo.name === name);
  return (
    <div className="m-1 h-6 w-6 rounded-xl">
      <Image src={logo.url} alt={name}></Image>
    </div>
  );
};
export default BranchLogo;
