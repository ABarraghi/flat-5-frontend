import classNames from 'classnames'

interface SaveTimeProps {
  className?: string
}

const SaveTimeIcon = (props: SaveTimeProps) => {
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
        <circle id="Ellipse 219" cx="43.5" cy="20.5" r="13.5" stroke="#393978" stroke-width="3" />
        <path id="Vector 819" d="M43 13V21H50" stroke="#F16521" stroke-width="3" />
        <path
          id="Vector"
          d="M13.317 39.291C19.1815 34.7542 27.3215 34.924 33.0005 39.7015L34.2924 40.7883L41.1331 41.1216C42.9483 41.2101 44.2851 42.8936 43.998 44.7296C43.7499 46.3157 42.3649 47.4497 40.798 47.3495L27.951 46.528L40.6926 47.7502C42.5686 47.9301 44.457 47.5802 46.1522 46.7385L57.136 41.2846C58.804 40.4564 60.8129 41.1551 61.642 42.8518C62.4449 44.4948 61.8547 46.4933 60.297 47.4064L43.6605 57.1584C41.0676 58.6784 38.0511 59.2639 35.0943 58.8211L23.9897 57.1584M12.8292 62L19.3202 59.1221C19.7868 58.9152 20.0198 58.3765 19.8557 57.8841L13.1588 37.7846C12.9792 37.2459 12.3964 36.9695 11.8786 37.1777L6 39.5406"
          stroke="#393978"
          stroke-width="3"
        />
      </g>
    </svg>
  )
}
export default SaveTimeIcon
