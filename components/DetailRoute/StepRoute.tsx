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
        title: (
          <span className="text-xl font-medium text-[#393978]">{`${load.pickupStop.address.line1}, ${load.pickupStop.address.cityName}`}</span>
        ),
        subTitle: '',
        description: <StepRouteItem carrierName={load.broker} />,
        icon: (
          <div className="chain-icon m-auto flex h-4 w-4 flex-none items-center justify-center rounded-full bg-[#393978]"></div>
        ),
      });
    });
    steps.push({
      title: <span className="text-xl font-medium text-[#393978]">{locations[1].address}</span>,
      subTitle: '',
      // description: <StepRouteItem carrierName={'coyote'} />,
      icon: (
        <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#393978]">
          <span className="text-[16px] font-normal text-white">B</span>
        </div>
      ),
    });
  }

  return (
    <>
      <Steps
        className="w-full px-5 py-2 text-[#393978]"
        current={current}
        direction="vertical"
        items={steps}
        // items={[
        //   {
        //     title: <span className="text-xl font-medium text-[#393978]">Philadelphia, PA</span>,
        //     subTitle: '',
        //     description: <StepRouteItem carrierName={'coyote'} />,
        //     icon: (
        //       <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#393978]">
        //         <span className="text-[16px] font-normal text-white">A</span>
        //       </div>
        //     ),
        //   },
        //   {
        //     title: <span className="text-xl font-medium text-[#393978]">Philadelphia, PA</span>,
        //     subTitle: '',
        //     description: <StepRouteItem carrierName={'coyote'} />,
        //     icon: (
        //       <div className="chain-icon m-auto flex h-4 w-4 flex-none items-center justify-center rounded-full bg-[#393978]">
        //         {/* <span className="text-[16px] font-normal text-white"></span> */}
        //       </div>
        //     ),
        //   },
        //   {
        //     title: <span className="text-xl font-medium text-[#393978]">Chicago</span>,
        //     subTitle: '',
        //     // description: <StepRouteItem />,
        //     icon: (
        //       <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#393978]">
        //         <span className="text-[16px] font-normal text-white">B</span>
        //       </div>
        //     ),
        //   },
        // ]}
      />
    </>
  );
};
export default StepRoute;
