interface WelcomeHeaderProps {
  title: string | string[];
  subtitle: string;
}

export default function WelcomeHeader({ title, subtitle }: WelcomeHeaderProps) {
  const titleLines = Array.isArray(title) ? title : [title];
  
  return (
    <div className="mb-12">
      <div className="mb-8 px-[70px]">
        <h1 
          className="text-center font-extrabold leading-[45px]"
          style={{
            fontSize: '35.9px',
            letterSpacing: '-1.188px',
            color: '#111811'
          }}
        >
          {titleLines.map((line, index) => (
            <span key={index}>
              {line}
              {index < titleLines.length - 1 && <br />}
            </span>
          ))}
        </h1>
      </div>
      <div className="pt-2">
        <p 
          className="text-center font-normal leading-6"
          style={{
            fontSize: '16px',
            color: '#638864'
          }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}

