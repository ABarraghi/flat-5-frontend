import classNames from 'classnames';

interface DistanceProps {
  className?: string;
}

const DistanceIcon = (props: DistanceProps) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="distance">
        <path
          id="Vector 825"
          d="M4.5 5H11.4773C14.0404 5 15.4231 8.00635 13.7551 9.95237L10.2449 14.0476C8.57687 15.9936 9.9596 19 12.5227 19H19.5"
          stroke="#393978"
          strokeWidth="2"
        />
        <circle id="Ellipse 220" cx="5" cy="5" r="4" fill="#393978" />
        <circle id="Ellipse 221" cx="19" cy="19" r="4" fill="#393978" />
      </g>
    </svg>
  );
};
export default DistanceIcon;
