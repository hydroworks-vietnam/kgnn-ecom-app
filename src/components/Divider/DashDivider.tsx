import { cn } from '@/utils/helpers';
import { memo } from 'react';

interface DashDividerProps {
  className?: string;      // Optional custom className for additional styling
  thickness?: string;      // Optional thickness (e.g., '1px', '2px')
  color?: string;          // Optional color (e.g., 'border-gray-300', 'border-gray-500')
}

const DashDivider = memo(({ className = '', thickness = '1px', color = 'border-slate-500' }: DashDividerProps) => {
  return (
    <hr
      className={cn('border-dashed', color, thickness, className)}
    />
  );
});

export default DashDivider;