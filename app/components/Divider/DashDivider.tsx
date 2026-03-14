import type { HTMLAttributes } from 'react';

interface DashDividerProps extends HTMLAttributes<HTMLHRElement> {
  className?: string;
  thickness?: string;
  color?: string;
}

const DashDivider = ({ className = '', thickness = '1px', color = 'border-slate-500', ...props }: DashDividerProps) => {
  return (
    <hr
      className={`border-dashed ${color} ${thickness} ${className}`}
      {...props}
    />
  );
};

export default DashDivider;
