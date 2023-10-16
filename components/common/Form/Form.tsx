import { type FieldValues, FormProvider, type SubmitHandler, type UseFormReturn } from 'react-hook-form';
import React from 'react';

export type Props<T extends FieldValues> = Omit<
  React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
  'onSubmit'
> & {
  children: React.ReactNode;
  onSubmit?: SubmitHandler<T>;
  methods: UseFormReturn<T>;
  style?: React.CSSProperties;
};

export const Form = <TFieldValues extends FieldValues>({
  children,
  onSubmit,
  methods,
  style,
  ...props
}: Props<TFieldValues>) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit && methods.handleSubmit(onSubmit as any)} {...props} style={style}>
        {children}
      </form>
    </FormProvider>
  );
};
