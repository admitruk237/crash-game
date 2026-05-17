'use client';

import { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { Button } from '@/shared/ui';

interface Props {
  initialVisible: boolean;
}

export const SoundModal = ({ initialVisible }: Props) => {
  const [visible, setVisible] = useState(initialVisible);

  const handleDismiss = () => setVisible(false);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-[340px] rounded-[16px] border border-border/50 bg-card p-6 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 border border-accent/20">
          <Volume2 className="h-8 w-8 text-accent" />
        </div>

        <h2 className="mb-2 text-center text-lg font-bold text-text-bright">Sound Effects</h2>

        <p className="mb-6 text-center text-sm text-muted-foreground leading-relaxed">
          This game uses sound effects.
          <br />
          Please make sure your device volume is turned on.
        </p>

        <Button
          id="sound-modal-ok"
          variant="action"
          onClick={handleDismiss}
          className="bg-accent text-bg-deep"
        >
          Got it
        </Button>
      </div>
    </div>
  );
};
