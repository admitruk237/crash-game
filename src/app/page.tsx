import { AuthGuard } from '@/features/auth/ui/AuthGuard';
import { GamePage } from '@/widgets/game-layout/ui/GamePage';

export default function Home() {
  return (
    <AuthGuard>
      <GamePage />
    </AuthGuard>
  );
}
