import { type JSX } from 'react';

interface UtilityServiceProps {
  icon: JSX.Element;
  title: string;
  content: string;
}
const UtilityService = ({ icon, title, content }: UtilityServiceProps) => {
  return (
    <div className="flex flex-col items-center justify-around">
      <div>{icon}</div>
      <div>
        <span className="text-[12px] font-medium text-[#393978] md:text-base">{title}</span>
      </div>
      <div>
        <span className="hidden font-thin sm:block">{content}</span>
      </div>
      <div />
    </div>
  );
};

export default UtilityService;
