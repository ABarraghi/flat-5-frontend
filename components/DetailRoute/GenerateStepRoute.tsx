import { type LoadBase } from '@/types/load';
import { type LocationBase } from '@/types/search';
import StepRouteItem from '@/components/DetailRoute/StepRouteItem';

export const GenerateStepRoute = (loads: LoadBase[] = [], routeType: string, locations: LocationBase[]) => {
  const steps = [];
  switch (routeType) {
    case 'standard':
      if (locations.length > 0) {
        steps.push({
          title: <span className="mb-5 block text-xl font-medium text-[#393978]">{locations[0].address}</span>,
          subTitle: '',
          description: <StepRouteItem brokerName={loads[0].broker} load={loads[0]} />,
          icon: (
            <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#393978]">
              <span className="text-[16px] font-normal text-white">A</span>
            </div>
          ),
        });
        steps.push({
          title: <span className="text-xl font-medium text-[#393978]">{locations[1].address}</span>,
          subTitle: '',
          icon: (
            <div className=" flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#393978]">
              <span className="text-[16px] font-normal text-white">B</span>
            </div>
          ),
        });
      }
      break;
    default:
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
        loads?.forEach((load) => {
          steps.push({
            title: (
              <span className="text-md mt-[-10px] block font-medium text-[#393978]">{load.pickupStop.address}</span>
            ),
            subTitle: '',
            description: <StepRouteItem brokerName={load.broker} load={load} />,
            icon: (
              <div className="chain-icon m-auto flex h-3 w-3 flex-none items-center justify-center rounded-full bg-[#393978]"></div>
            ),
          });
          steps.push({
            title: (
              <span className="text-md mt-[-10px] block font-medium text-[#393978]">{load.deliveryStop.address}</span>
            ),
            icon: (
              <div className="chain-icon m-auto flex h-3 w-3 flex-none items-center justify-center rounded-full bg-[#393978]"></div>
            ),
          });
        });
        steps.push({
          title: <span className="text-xl font-medium text-[#393978]">{locations[1].address}</span>,
          subTitle: '',
          icon: (
            <div className=" flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#393978]">
              <span className="text-[16px] font-normal text-white">B</span>
            </div>
          ),
        });
      }
      break;
  }
  return steps;
};
