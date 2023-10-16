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
        <span className="font-medium text-[#393978]">{title}</span>
      </div>
      <div>
        <span className="font-thin">{content}</span>
      </div>
      <div />
    </div>
  );
};

export default UtilityService;
