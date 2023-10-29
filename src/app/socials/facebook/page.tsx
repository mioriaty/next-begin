'use client';

import { useRouter } from 'next/navigation';

const Facebook = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <div>
      Facebook Page
      <div>
        <button onClick={handleClick}>Back home</button>
      </div>
    </div>
  );
};
export default Facebook;
