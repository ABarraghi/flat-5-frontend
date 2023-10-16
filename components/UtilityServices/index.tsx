import UtilityService from '@/components/UtilityService';
import MaximizeEfficiencyIcon from '@/components/common/icons/MaximizeEfficiencyIcon';
import SaveTimeIcon from '@/components/common/icons/SaveTimeIcon';
import OneStopSolutionIcon from '@/components/common/icons/OneStopSolutionIcon';

const UtilityServices = () => {
  return (
    <div className="grid grid-cols-3 place-content-center place-items-center gap-32">
      <UtilityService
        icon={<MaximizeEfficiencyIcon className={'h-20 w-20'} />}
        title={'Maximize Efficiency'}
        content={'Lorem ipsum dolor sit amet'}
      />
      <UtilityService
        icon={<SaveTimeIcon className={'h-20 w-20'} />}
        title={'Save Time'}
        content={'Lorem ipsum dolor sit amet'}
      />
      <UtilityService
        icon={<OneStopSolutionIcon className={'h-20 w-20'} />}
        title={'One-Stop Solution'}
        content={'Lorem ipsum dolor sit amet'}
      />
    </div>
  );
};
export default UtilityServices;
