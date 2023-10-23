import cn from 'classnames';
import { useCallback } from 'react';

interface TagProps {
  id: string;
  isSelected?: boolean;
  title: string;
  onClick: (id: string) => unknown;
  isIconHidden?: boolean;
  className?: string;
}

const ToggleTag = (props: TagProps) => {
  const { id, title, onClick, className } = props;

  const handleOnClick = useCallback(() => {
    onClick(id);
  }, [onClick, id]);

  return (
    <span
      className={cn(
        ' mb-2 mr-2 inline-flex cursor-pointer items-center rounded-full border bg-[#F2F2F7] px-[8px] py-[8px] text-[10px] font-normal uppercase hover:shadow-md lg:mb-4 lg:mr-4 lg:px-[15px] lg:py-[10px] lg:text-[12px]',
        {
          'selected flex-row-reverse !bg-[#393978] text-white': props.isSelected,
        },
        className,
      )}
      key={id}
      onClick={handleOnClick}
    >
      <span className="px-1 lg:px-2">{title}</span>
    </span>
  );
};

export default ToggleTag;
