import cn from 'classnames';

interface SpinnerIconProps {
  className?: string;
}

const SpinnerIcon = (props: SpinnerIconProps) => {
  return (
    <span
      className={cn(
        'mx-1 inline-block h-[1em] w-[1em] animate-spin rounded-full border-2 border-b-primary border-l-transparent border-r-primary border-t-primary',
        props.className,
      )}
    />
  );
};

export default SpinnerIcon;
