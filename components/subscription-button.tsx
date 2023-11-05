'use client';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { Sparkles } from 'lucide-react';
import { FC, useState } from 'react';

interface SubscriptionButtonProps {
  isPro: boolean;
  className?: string;
}

const SubscriptionButton: FC<SubscriptionButtonProps> = ({ isPro, className }) => {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/stripe');
      // todo something after get data from stripe
      location.href = data.url;
      
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });
    } finally {
      setLoading(true);
    }
  };

  return (
    <div className={className}>
      <Button
        variant={'outline'}
        size="lg"
        disabled={loading}
        onClick={handleSubscribe}
        className={cn('text-white w-full font-semibold border-none gradient-btn', 'hover:text-white')}
      >
        <span>{isPro ? 'Manage subscription' : 'Upgrade to pro'}</span>
        <Sparkles />
      </Button>
    </div>
  );
};

export default SubscriptionButton;
