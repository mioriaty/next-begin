import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';
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
        'group flex items-center mb-5 p-3.5 border border-slate-400 rounded-xl transition-all',
        'hover:bg-gray-100',
        'last:mb-0',
        'lg:p-3.5',
        '2xl:p-2.5',
      )}
    >
      <Link className="w-full" href={url}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-6 rounded-lg p-1 w-16 h-16 relative flex justify-center items-center">
              <div className={cn(toolItemColorVariant({ color: slug }))} />
              <Image src={icon} alt={title} width={24} height={24} />
            </div>
            <span className="font-medium">{title}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ToolItem;
