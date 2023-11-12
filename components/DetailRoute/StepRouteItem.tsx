import PriceAndDistance from '@/components/RouteOverview/PriceAndDistance';
import BranchLogo from '@/components/CarrierLogo';
import cn from 'classnames';
import ContactInfo from '@/components/ContactInfo';
import { DownOutlined, MailFilled, PhoneFilled, WhatsAppOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { type Metadata } from '@/types/load';

// const Carriers = ['land-star', 'coyote'];
interface StepRouteItemProps {
  carrierName: string;
  metadata: Metadata;
}
const StepRouteItem = ({ carrierName = 'Coyote', metadata }: StepRouteItemProps) => {
  const [isOpenDescription, setIsOpenDescription] = useState(false);
  const toggleCollapseDescription = () => {
    setIsOpenDescription((state) => !state);
  };
  return (
    <div className={cn('rounded-xl bg-[#F2F2F7] text-[#393978]')}>
      <div className="flex p-3">
        <BranchLogo name={metadata.name} classNames="h-14 w-14" />
        <div className="my-auto px-5 ">
          <span className="text-xl font-normal">{metadata.name}</span>
          <PriceAndDistance
            price={metadata.estimationAmount}
            distance={metadata.estimationDistance}
            customClass={'text-base'}
            isMock={false}
          />
        </div>
      </div>
      <div className="flex justify-items-start gap-3 p-3 text-base font-normal text-[#2E2F44]">
        {metadata.phone && <ContactInfo icon={<PhoneFilled />} content={metadata.phone} />}
        {metadata.fax && <ContactInfo icon={<WhatsAppOutlined />} content={metadata.fax} />}
        {metadata.email && <ContactInfo icon={<MailFilled />} content={metadata.email} />}
      </div>
      <span className="flex items-center p-3 text-base font-medium text-[#393978]" onClick={toggleCollapseDescription}>
        {isOpenDescription ? 'Hide Description' : 'View Description '} &nbsp;
        <DownOutlined
          className={cn('origin-center stroke-[#393978] stroke-[50px] font-bold', {
            'rotate-180 transform': isOpenDescription,
          })}
        />
      </span>
      {isOpenDescription && (
        <div className=" p-3 text-base text-[#2E2F44]">
          <span className="mock-data">
            A transportation solutions provider that prioritizes safety in every aspect of our services, ensuring secure
            and reliable transportation solutions for all your cargo needs.
          </span>
        </div>
      )}
    </div>
  );
};
export default StepRouteItem;
