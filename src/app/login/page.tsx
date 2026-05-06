import Image from 'next/image';
import { LoginForm } from '@/features/auth/ui/LoginForm';

export default function LoginPage() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-accent-soft border border-accent-muted flex items-center justify-center mb-4">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} className="object-contain" />
          </div>
          <h1 className="text-[36px] font-menlo leading-[40px] tracking-[-0.9px] text-white uppercase italic text-center">
            <span className="text-accent">Crash</span> Game
          </h1>
          <p className="text-main text-md text-center">
            High-stakes real-time betting. Cash out before the crash.
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
