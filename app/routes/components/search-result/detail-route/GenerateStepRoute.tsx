import { type LoadBase } from '@/types/load';
import { type LocationBase } from '@/types/search';
import StepRouteItem from '@/app/routes/components/search-result/detail-route/StepRouteItem';

export const GenerateStepRoute = (loads: LoadBase[] = [], routeType: string, locations: LocationBase[]) => {
  const steps = [];
  if (locations.length > 1) {
    steps.push({
      className: 'main-points',
      title: <span className="text-lg font-medium text-[#393978] xl:text-xl">{locations[0].address}</span>,
      subTitle: '',
      description: <div className="h-5 xl:h-10" />,
      icon: (
        <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#393978]">
          <span className="text-[16px] font-normal text-white">{locations[0].title}</span>
        </div>
      ),
    });
    for (let i = 1; i < locations.length; i++) {
      const location = locations[i];
      const previousLocation = locations[i - 1];
      const keyPoints = `${previousLocation.coordinate?.latitude}_${previousLocation.coordinate?.longitude}_${location.coordinate?.latitude}_${location.coordinate?.longitude}`;

      loads?.forEach((load) => {
        if (load.keyByPoints === keyPoints) {
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
        }
      });
      steps.push({
        className: 'main-points',
        title: <span className="text-xl font-medium text-[#393978]">{location.address}</span>,
        subTitle: '',
        description: <div className="h-5 xl:h-10" />,
        icon: (
          <div className=" flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#393978]">
            <span className="text-[16px] font-normal text-white">{location.title}</span>
          </div>
        ),
      });
    }
  }
  return steps;
};
