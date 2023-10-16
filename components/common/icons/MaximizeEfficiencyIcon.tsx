import classNames from 'classnames';

interface MaximizeEfficiencyProps {
  className?: string;
}

const MaximizeEfficiencyIcon = (props: MaximizeEfficiencyProps) => {
  return (
    <svg
      width="68"
      height="68"
      viewBox="0 0 68 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames('h-10 w-10 scale-75', props.className)}
    >
      <path
        d="M62.0907 51.5182C65.7316 41.0758 63.3801 29.0088 55.0363 20.665C43.4182 9.0469 24.5816 9.0469 12.9636 20.665C4.61971 29.0088 2.26823 41.0758 5.90911 51.5182"
        stroke="#393978"
        strokeWidth="3"
      />
      <path d="M34 42.0789L46.46 29.2413" stroke="#F16521" strokeWidth="3" />
      <path d="M62.6953 41.7013L57.0317 41.7013" stroke="#393978" strokeWidth="3" />
      <path d="M10.9678 41.7013L5.30416 41.7013" stroke="#393978" strokeWidth="3" />
      <path d="M34 13.0056V18.6692" stroke="#393978" strokeWidth="3" />
      <path d="M54.291 21.4103L50.2862 25.4151" stroke="#393978" strokeWidth="3" />
      <path d="M17.7139 25.415L13.7091 21.4103" stroke="#393978" strokeWidth="3" />
      <circle cx="34" cy="41.7917" r="4.25" fill="#F16521" />
    </svg>
  );
};
export default MaximizeEfficiencyIcon;
