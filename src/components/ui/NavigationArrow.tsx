import { cn } from "@/utils/helpers";

interface NavigationArrowProps {
  direction: "left" | "right";
  onClick?: () => void;
  className?: string;
}

export const NavigationArrow = ({ direction, onClick, className }: NavigationArrowProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "bg-white/80 p-2 rounded-full hover:bg-white transition-colors",
        className
      )}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d={direction === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} 
        />
      </svg>
    </button>
  );
}; 