import * as React from 'react';
import { cn } from '@/shared/lib';

interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
}

function SectionTitle({ className, icon, children, ...props }: SectionTitleProps) {
  return (
    <div
      data-slot="section-title"
      className={cn(
        'flex items-center gap-2 text-main font-medium text-[12px] leading-[16px] tracking-[0.6px] uppercase select-none',
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </div>
  );
}

export { SectionTitle };
