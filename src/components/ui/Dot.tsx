import { cn } from "@/utils/helpers";

interface DotProps {
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Dot = ({ active, onClick, className }: DotProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-3 h-3 rounded-full transition-all",
        active ? "bg-primary scale-125" : "bg-white border-2 hover:bg-[#fb2e86]/20",
        className
      )}
    />
  );
}; 