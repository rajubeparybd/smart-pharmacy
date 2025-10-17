interface DecorativeCircleProps {
  size: number;
  color: string;
  opacity: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export default function DecorativeCircle({ 
  size, 
  color, 
  opacity, 
  top, 
  bottom, 
  left, 
  right 
}: DecorativeCircleProps) {
  return (
    <div 
      className="absolute rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `rgba(${color}, ${opacity})`,
        top,
        bottom,
        left,
        right
      }}
    />
  );
}

