import { Steps } from 'antd';
import StepRouteItem from '@/components/DetailRoute/StepRouteItem';
import { type LocationBase } from '@/types/search';
import { type LoadBase } from '@/types/load';

interface StepRouteProps {
  locations: LocationBase[];
  loads: LoadBase[];
}
const StepRoute = ({ locations, loads }: StepRouteProps) => {
  const steps = [];
  let current = 2;
  if (loads.length > 0) {
    current += loads.length;
  }
  if (locations.length > 0) {
    steps.push({
      title: <span className="text-xl font-medium text-[#393978]">{locations[0].address}</span>,
      subTitle: '',
      description: <div className="h-10" />,
      icon: (
        <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#393978]">
          <span className="text-[16px] font-normal text-white">A</span>
        </div>
      ),
    });
    loads.forEach((load) => {
      steps.push({
        title: <span className="text-md mt-[-10px] block font-medium text-[#393978]">{load.pickupStop.address}</span>,
        subTitle: '',
        description: <StepRouteItem carrierName={load.broker} metadata={load.metadata} />,
        icon: (
          <div className="chain-icon m-auto flex h-3 w-3 flex-none items-center justify-center rounded-full bg-[#393978]"></div>
        ),
      });
    });
    steps.push({
      title: <span className="text-xl font-medium text-[#393978]">{locations[1].address}</span>,
      subTitle: '',
      // description: <StepRouteItem carrierName={'coyote'} />,
      icon: (
        <div className=" flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#393978]">
          <span className="text-[16px] font-normal text-white">B</span>
        </div>
      ),
    });
  }

  return (
    <>
      <Steps
        className="detail-container w-full px-5 py-2 text-[#393978] "
        current={current}
        direction="vertical"
        items={steps}
      />
    </>
  );
};
export default StepRoute;
