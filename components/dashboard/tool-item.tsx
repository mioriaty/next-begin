import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { FC } from 'react';

export interface ToolItemProps {
  icon: string;
  title: string;
  url: string;
  slug: 'code' | 'audio' | 'photo' | 'conversation' | 'video';
  color?: string;
}

const toolItemColorVariant = cva('absolute inset-0 opacity-20 rounded-xl', {
  variants: {
    color: {
      code: 'bg-green-500',
      audio: 'bg-orange-500',
      photo: 'bg-violet-500',
      video: 'bg-amber-500',
      conversation: 'bg-blue-500',
    },
  },
  defaultVariants: {
    color: 'code',
  },
});

const ToolItem: FC<ToolItemProps> = ({ icon, slug, title, url, color }) => {
  return (
    <div
      className={cn(
        'group flex items-center mn-5 p-3.5 border rounded-xl transition-all',
        'hover:border-transparent',
        'last:mb-0',
        'lg:p-3.5',
        '2xl:p2.5',
      )}
    >
      ToolItem
    </div>
  );
};

export default ToolItem;
