import cn from 'classnames';
import Link from 'next/link';
import { type ReactNode, type RefObject } from 'react';
import SpinnerIcon from './icons/SpinnerIcon';

interface ButtonWrapperProps {
  internalHref?: string;
  children: ReactNode;
}

const ButtonWrapper = (props: ButtonWrapperProps) => {
  const { internalHref, children } = props;
  if (!internalHref) return <>{children}</>;
  return <Link href={internalHref}>{children}</Link>;
};

interface ControlButtonProps {
  onClick?: () => void;
  name?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  wrapperClass?: string;
  contentClass?: string;
  internalHref?: string;
  externalHref?: string;
  disabled?: boolean;
  loading?: boolean;
  children?: ReactNode;
  buttonRef?: RefObject<HTMLButtonElement>;
  form?: string;
}

const Button = (props: ControlButtonProps) => {
  return (
    <ButtonWrapper internalHref={props.internalHref || ''}>
      <button
        className={cn('flex min-w-[100px] items-center justify-center p-2 transition-all lg:p-3', props.wrapperClass, {
          'cursor-not-allowed opacity-40 hover:shadow-none': props.disabled || props.loading,
        })}
        type={props.type || 'button'}
        onClick={props.onClick}
        disabled={props.disabled}
        ref={props.buttonRef}
        form={props.form}
      >
        {props.name != null && (
          <span
            className={cn('flex h-full items-center justify-center gap-2 uppercase tracking-wider', props.contentClass)}
            style={{ lineHeight: '100%' }}
          >
            {props.loading && <SpinnerIcon />}
            <span>{props.name}</span>
          </span>
        )}
        {props.children}
      </button>
    </ButtonWrapper>
  );
};

export default Button;
