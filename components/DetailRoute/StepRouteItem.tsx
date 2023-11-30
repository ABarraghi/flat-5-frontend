import PriceAndDistance from '@/components/RouteOverview/PriceAndDistance';
import BranchLogo from '@/components/CarrierLogo';
import cn from 'classnames';
import ContactInfo from '@/components/ContactInfo';
import { DownOutlined, MailFilled, PhoneFilled, WhatsAppOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { type LoadBase } from '@/types/load';
import DetailDescription from '@/components/DetailRoute/DetailDescription';

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
      <div className="flex p-3 xl:p-6">
        <BranchLogo name={brokerName} classNames="h-10 w-10 xl:h-14 xl:w-14" />
        <div className="my-auto pl-5 ">
          <span className="text-lg font-normal xl:text-xl">{load?.shipperInfo?.name}</span>
          <PriceAndDistance
            price={Math.floor(load?.amount || 0)}
            distance={Math.floor(load?.distance || 0)}
            customClass={'text-md xl:text-base flex-wrap gap-2 xl:gap-5'}
            isMock={false}
          />
        </div>
      </div>
      {(load?.shipperInfo?.phone || load?.shipperInfo?.fax || load?.shipperInfo?.email) && (
        <div className="flex flex-wrap justify-items-start gap-3 px-6 py-3 text-base font-normal text-[#2E2F44]">
          {load?.shipperInfo?.phone && <ContactInfo icon={<PhoneFilled />} content={load?.shipperInfo?.phone ?? ''} />}
          {load?.shipperInfo?.fax && <ContactInfo icon={<WhatsAppOutlined />} content={load?.shipperInfo?.fax ?? ''} />}
          {load?.shipperInfo?.email && <ContactInfo icon={<MailFilled />} content={load?.shipperInfo?.email ?? ''} />}
        </div>
      )}
      <span
        className="flex items-center px-6 py-3 text-base font-medium text-[#393978]"
        onClick={toggleCollapseDescription}
      >
        {isOpenDescription ? 'Hide Description' : 'View Description '} &nbsp;
        <DownOutlined
          className={cn('origin-center stroke-[#393978] stroke-[50px] font-bold', {
            'rotate-180 transform': isOpenDescription,
          })}
        />
      </span>
      {isOpenDescription && <DetailDescription load={load} />}
    </div>
  );
};
export default StepRouteItem;
