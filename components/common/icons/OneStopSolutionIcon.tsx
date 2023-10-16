import classNames from 'classnames';

interface OneStopSolutionProps {
  className?: string;
}

const OneStopSolutionIcon = (props: OneStopSolutionProps) => {
  return (
    <svg
      width="68"
      height="68"
      viewBox="0 0 68 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames('h-10 w-10 scale-75', props.className)}
    >
      <g id="clock">
        <path
          id="Vector"
          d="M57.4045 48.0417C57.4045 51.3324 54.6878 54 51.3366 54C47.9854 54 45.2687 51.3324 45.2687 48.0417C45.2687 44.751 47.9854 42.0833 51.3366 42.0833C54.6878 42.0833 57.4045 44.751 57.4045 48.0417ZM57.4045 48.0417H60.6994C61.6934 48.0417 62.5726 47.4089 62.8719 46.4782C64.6791 40.859 64.305 34.7819 61.8217 29.4174L60.0502 25.5904C58.439 22.1097 54.9046 19.875 51.0109 19.875H44.1655M15.4809 48.0417C15.4809 51.3324 18.1976 54 21.5488 54C24.9 54 27.6167 51.3324 27.6167 48.0417C27.6167 44.751 24.9 42.0833 21.5488 42.0833C18.1976 42.0833 15.4809 44.751 15.4809 48.0417ZM15.4809 48.0417C9.69246 48.0417 5 43.4339 5 37.75V16.7091C5 15.7652 5.77924 15 6.74048 15H40.8557C42.6836 15 44.1655 16.4551 44.1655 18.25V19.875M44.1655 19.875V28C44.1655 32.1882 47.6231 35.5833 51.8882 35.5833H59.0594M45.8203 48.0417H31.4781"
          stroke="#393978"
          strokeWidth="3"
        />
        <path id="Vector 820" d="M17.5 28L23 33.5L33 23.5" stroke="#F16521" strokeWidth="3" />
      </g>
    </svg>
  );
};
export default OneStopSolutionIcon;
