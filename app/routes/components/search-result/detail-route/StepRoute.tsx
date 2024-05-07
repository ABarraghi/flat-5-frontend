// waiting for shadcn steps component: https://github.com/shadcn-ui/ui/pull/318
import { Steps } from 'antd';
import { type LocationBase } from '@/types/search';
import { type LoadBase } from '@/types/load';
import { useEffect, useState } from 'react';
import { GenerateStepRoute } from '@/app/routes/components/search-result/detail-route/GenerateStepRoute';
import { type StepProps } from 'antd/es/steps';
const { Step } = Steps;

interface StepRouteProps {
  locations: LocationBase[];
  loads: LoadBase[];
  routeType: string;
}

const StepRoute = ({ locations, loads, routeType }: StepRouteProps) => {
  const [stepItems, setStepItems] = useState<StepProps[]>([]);
  const [current, setCurrent] = useState(2);

  useEffect(() => {
    if (loads?.length > 0) {
      setCurrent((prevState) => prevState + (loads?.length || 0));
    }
    const steps = GenerateStepRoute(loads, routeType, locations);
    setStepItems(steps);
  }, [loads, locations, routeType]);

  return (
    <>
      <Steps className="detail-container w-full px-5 py-2 text-[#393978] " current={current} direction="vertical">
        {stepItems.map((item, index) => (
          <Step key={index} {...item} />
        ))}
      </Steps>
    </>
  );
};
export default StepRoute;
