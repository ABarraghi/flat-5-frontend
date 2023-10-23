import { Steps } from 'antd';
import StepRouteItem from '@/components/DetailRoute/StepRouteItem';

const StepRoute = () => {
  return (
    <>
      <Steps
        className="w-full px-5 py-2 text-[#393978]"
        current={3}
        direction="vertical"
        items={[
          {
            title: <span className="text-xl font-medium text-[#393978]">Philadelphia, PA</span>,
            subTitle: '',
            description: <StepRouteItem carrierName={'coyote'} />,
            icon: (
              <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#393978]">
                <span className="text-[16px] font-normal text-white">A</span>
              </div>
            ),
          },
          {
            title: <span className="text-xl font-medium text-[#393978]">Philadelphia, PA</span>,
            subTitle: '',
            description: <StepRouteItem carrierName={'coyote'} />,
            icon: (
              <div className="chain-icon m-auto flex h-4 w-4 flex-none items-center justify-center rounded-full bg-[#393978]">
                {/* <span className="text-[16px] font-normal text-white"></span> */}
              </div>
            ),
          },
          {
            title: <span className="text-xl font-medium text-[#393978]">Chicago</span>,
            subTitle: '',
            // description: <StepRouteItem />,
            icon: (
              <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#393978]">
                <span className="text-[16px] font-normal text-white">B</span>
              </div>
            ),
          },
        ]}
      />
    </>
  );
};
export default StepRoute;
