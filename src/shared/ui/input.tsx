'use client';

import { type ComponentProps, type ReactNode } from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';

import { cn } from '@/shared/lib';

interface Props extends ComponentProps<'input'> {
  suffix?: ReactNode;
}

function Input({ className, type, suffix, ...props }: Props) {
  return (
    <div className="relative w-full">
      <InputPrimitive
        type={type}
        data-slot="input"
        className={cn(
          'flex h-[40px] w-full rounded-[10px] border border-border/50 bg-muted px-3 py-2 text-[16px] leading-[24px] font-normal text-white transition-colors outline-none placeholder:text-main focus-visible:border-accent/50 disabled:cursor-not-allowed disabled:opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
          suffix && 'pr-12',
          className
        )}
        {...props}
      />
      {suffix && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-main text-[16px] leading-[24px] font-normal pointer-events-none">
          {suffix}
        </div>
      )}
    </div>
  );
}

export { Input };
