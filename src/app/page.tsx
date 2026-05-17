import { AuthGuard } from '@/features/auth';
import { GamePage } from '@/widgets/game-layout';
import { GameStage } from '@/widgets/game-stage';

export default function Home() {
  return (
    <AuthGuard>
      <GamePage stage={<GameStage />} />
    </AuthGuard>
  );
}
