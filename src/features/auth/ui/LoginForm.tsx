'use client';

import { Card, CardContent } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { SectionTitle } from '@/shared/ui/section-title';
import { cn } from '@/shared/lib/utils';
import { useAuthForm } from '../model/useAuthForm';

export const LoginForm = () => {
  const { username, isReady, setUsername, handleEnter } = useAuthForm();

  return (
    <Card variant="game" className="p-[25px]">
      <CardContent className="p-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEnter();
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <SectionTitle>Username</SectionTitle>
            <Input
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-[50px] w-full rounded-[10px] bg-muted border-border px-[16px] py-[12px] text-white placeholder:text-muted placeholder:text-[16px] placeholder:font-normal focus:border-success focus:ring-0 focus-visible:ring-0 transition-all duration-300"
            />
            <p className="mt-2 text-description font-sans font-normal text-[12px] leading-[16px] tracking-normal">
              Minimum 3 characters required
            </p>
          </div>

          <Button
            type="submit"
            variant="game"
            disabled={!isReady}
            className={cn(
              'mt-6 text-black transition-all duration-300',
              isReady
                ? 'bg-accent hover:bg-accent/90 cursor-pointer'
                : 'bg-btn-disabled cursor-not-allowed'
            )}
          >
            Enter Game
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
