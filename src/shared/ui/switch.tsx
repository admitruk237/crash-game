import { Switch as SwitchPrimitive } from '@base-ui/react/switch';
import { cn } from '@/shared/lib';

type Props = SwitchPrimitive.Root.Props;

const Switch = ({ className, onCheckedChange, ...props }: Props) => (
  <SwitchPrimitive.Root
    data-slot="switch"
    onCheckedChange={onCheckedChange}
    className={cn(
      'peer group/switch relative inline-flex h-[24px] w-[48px] shrink-0 items-center rounded-full transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-success data-unchecked:bg-muted',
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      className="pointer-events-none block size-5 rounded-full bg-white shadow-lg transition-transform data-checked:translate-x-6 data-unchecked:translate-x-0.5"
    />
  </SwitchPrimitive.Root>
);

export { Switch };
