import PriceAndDistance from '@/components/RouteOverview/PriceAndDistance';
import BranchLogo from '@/components/CarrierLogo';
import cn from 'classnames';
import ContactInfo from '@/components/ContactInfo';
import { DownOutlined, MailFilled, PhoneFilled, WhatsAppOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { type LoadBase } from '@/types/load';

// const Carriers = ['land-star', 'coyote'];
interface StepRouteItemProps {
  brokerName: string;
  load: LoadBase;
}
const StepRouteItem = ({ brokerName = 'Coyote', load }: StepRouteItemProps) => {
  const [isOpenDescription, setIsOpenDescription] = useState(false);
  const toggleCollapseDescription = () => {
    setIsOpenDescription((state) => !state);
  };
  return (
    <div className={cn('rounded-xl bg-[#F2F2F7] text-[#393978]')}>
      <div className="flex p-3">
        <BranchLogo name={brokerName} classNames="h-14 w-14" />
        <div className="my-auto px-5 ">
          <span className="text-xl font-normal">{load?.shipperInfo?.name}</span>
          <PriceAndDistance
            price={Math.floor(load?.amount || 0)}
            distance={Math.floor(load?.distance || 0)}
            customClass={'text-base'}
            isMock={false}
          />
        </div>
      </div>
      <div className="flex justify-items-start gap-3 p-3 text-base font-normal text-[#2E2F44]">
        {load?.shipperInfo?.phone && <ContactInfo icon={<PhoneFilled />} content={load?.shipperInfo?.phone ?? ''} />}
        {load?.shipperInfo?.fax && <ContactInfo icon={<WhatsAppOutlined />} content={load?.shipperInfo?.fax ?? ''} />}
        {load?.shipperInfo?.email && <ContactInfo icon={<MailFilled />} content={load?.shipperInfo?.email ?? ''} />}
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
