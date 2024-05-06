import UtilityService from '@/components/UtilityService';
import MaximizeEfficiencyIcon from '@/components/common/icons/MaximizeEfficiencyIcon';
import SaveTimeIcon from '@/components/common/icons/SaveTimeIcon';
import OneStopSolutionIcon from '@/components/common/icons/OneStopSolutionIcon';

const UtilityServices = () => {
  return (
    <div className="md:gap-25 flex flex-wrap place-content-center place-items-center gap-5 py-10 sm:gap-10 lg:gap-36">
      <UtilityService
        icon={<MaximizeEfficiencyIcon className={'h-15 w-15 md:h-20 md:w-20'} />}
        title={'Maximize Efficiency'}
        content={'Lorem ipsum dolor sit amet'}
      />
      <UtilityService
        icon={<SaveTimeIcon className={'h-15 w-15 md:h-20 md:w-20'} />}
        title={'Save Time'}
        content={'Lorem ipsum dolor sit amet'}
      />
      <UtilityService
        icon={<OneStopSolutionIcon className={'h-15 w-15 md:h-20 md:w-20'} />}
        title={'One-Stop Solution'}
        content={'Lorem ipsum dolor sit amet'}
      />
    </div>
  );
};
export default UtilityServices;
