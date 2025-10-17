import Image from "next/image";

interface UploadedFileProps {
  fileName: string;
  filePreview?: string;
  onChangeFile: () => void;
}

export default function UploadedFile({ fileName, filePreview, onChangeFile }: UploadedFileProps) {
  return (
    <div 
      className="w-full flex flex-col rounded-[24px] p-[17px] gap-4"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E0E0E0',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)'
      }}
    >
      {/* File info row */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          {/* Check icon */}
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none"
            className="flex-shrink-0"
          >
            <circle cx="12" cy="12" r="10" fill="#4CAF50"/>
            <path 
              d="M9 12L11 14L15 10" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>

          {/* File name */}
          <p
            className="font-medium"
            style={{
              fontSize: '16px',
              lineHeight: '24px',
              color: '#333333'
            }}
          >
            {fileName}
          </p>
        </div>

        {/* Change file button */}
        <button
          onClick={onChangeFile}
          className="font-normal transition-all hover:underline hover:cursor-pointer"
          style={{
            fontSize: '14px',
            lineHeight: '20px',
            color: '#ACD8E6'
          }}
        >
          Change File
        </button>
      </div>

      {/* File preview */}
      {filePreview && (
        <div 
          className="w-full rounded-2xl overflow-hidden flex items-center justify-center"
          style={{
            height: '128px',
            background: '#F3F4F6'
          }}
        >
          <Image 
            width={128}
            height={128}
            src={filePreview} 
            className="w-full h-full object-contain"
            alt="Preview" 
          />
        </div>
      )}
    </div>
  );
}

