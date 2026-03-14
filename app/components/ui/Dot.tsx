interface DotProps {
  active?: boolean;
  onClick?: () => void;
}

const Dot = ({ active = false, onClick }: DotProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-3 h-3 rounded-full transition-all duration-300 ${
        active ? 'bg-primary scale-110' : 'bg-gray-300 hover:bg-gray-400'
      }`}
    />
  );
};

export default Dot;
