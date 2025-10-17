interface FooterProps {
  text: string;
}

export default function Footer({ text }: FooterProps) {
  return (
    <div className="mt-20">
      <p 
        className="text-center font-normal"
        style={{
          fontSize: '14px',
          lineHeight: '21px',
          color: '#6B7280'
        }}
      >
        {text}
      </p>
    </div>
  );
}

