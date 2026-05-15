'use client';

import { memo } from 'react';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib';

const badgeVariants = cva(
  'group/badge inline-flex shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!',
  {
    variants: {
      variant: {
        high: 'bg-badge-win-bg border-badge-win-border text-badge-win-text',
        low: 'bg-badge-crashed-bg border-badge-crashed-border text-badge-crashed-text',
        mid: 'bg-badge-waiting-bg border-badge-waiting-border text-badge-waiting-text',
        'status-running': 'bg-border/20 border-border text-badge-win-text',
        'status-crashed': 'bg-border/20 border-border text-badge-crashed-text',
        'status-waiting': 'bg-border/20 border-border text-badge-waiting-text',
        secondary: 'bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80',
        destructive:
          'bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20',
        outline: 'border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground',
      },
      size: {
        sm: 'h-[30px] w-[69px] text-[12px] px-2 py-0.5',
        md: 'h-[36px] px-4 text-[13px] tracking-wide',
      },
    },
    defaultVariants: {
      variant: 'mid',
      size: 'sm',
    },
  }
);

type Props = useRender.ComponentProps<'span'> & VariantProps<typeof badgeVariants>;

const BadgeComponent = ({ className, variant = 'mid', size = 'sm', render, ...props }: Props) => {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(badgeVariants({ variant, size }), className),
      },
      props
    ),
    render,
    state: {
      slot: 'badge',
      variant,
    },
  });
};

const Badge = memo(BadgeComponent);

export { Badge, badgeVariants };
