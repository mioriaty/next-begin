import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@clerk/nextjs';
import { FC, ReactNode } from 'react';

interface UserMessageProps {
  children: ReactNode;
}

const UserMessage: FC<UserMessageProps> = ({ children }) => {
  const { user } = useUser();
  return (
    <div className="border p-4 pb-10 rounded-xl mr-20 relative">
      {children}
      <div className="bg-secondary w-14 h-14 rounded-xl flex justify-center items-center absolute left-6 -bottom-6">
        <Avatar>
          <AvatarImage src={user?.imageUrl} />
        </Avatar>
      </div>
    </div>
  );
};

export default UserMessage;
