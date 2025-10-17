'use client';

import { useRouter } from 'next/navigation';
import { Button, DecorativeCircle, WelcomeHeader, Footer } from '@/components';

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-[#F6F8F6]">
      {/* Background with gradient */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="w-full h-full min-h-[720px] flex items-center justify-center px-4 py-28"
          style={{
            background: 'linear-gradient(135deg, #DCFCe7 0%, #FFFFFF 50%, #DBEBFD 100%)'
          }}
        >
          {/* Decorative circles */}
          <DecorativeCircle 
            size={64}
            color="24, 220, 31"
            opacity={0.2}
            top="180px"
            left="320px"
          />
          <DecorativeCircle 
            size={96}
            color="147, 197, 253"
            opacity={0.2}
            top="360px"
            right="864px"
          />
          <DecorativeCircle 
            size={48}
            color="24, 220, 31"
            opacity={0.3}
            bottom="492px"
            left="427px"
          />
          <DecorativeCircle 
            size={80}
            color="147, 197, 253"
            opacity={0.3}
            top="400px"
            left="774px"
          />

          {/* Main content container */}
          <div className="w-full max-w-[512px] flex flex-col items-center">
            {/* Header section */}
            <WelcomeHeader 
              title={["Welcome to UIU", "Smart Pharmacy"]}
              subtitle="Your modern solution for prescription and medicine management"
            />

            {/* Buttons section */}
            <div className="w-full flex flex-col items-center gap-6 px-4">
              <Button 
                variant="primary"
                onClick={() => router.push('/select-medicine')}
              >
                Select Medicine
              </Button>

              <Button 
                variant="secondary"
                onClick={() => router.push('/upload-prescription')}
              >
                Upload Prescription
              </Button>
            </div>

            {/* Footer */}
            <Footer text="Powered by Department of CSE, United International University" />
          </div>
        </div>
      </div>
    </div>
  );
}
