import { DAY_IN_MS, MAX_FREE_COUNT } from '@/constants';
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';

export const getUserLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  return await prismadb.userLimit.findUnique({ where: { userId } });
};

export const getUserLimitCount = async () => {
  const userLimit = await getUserLimit();
  if (!userLimit) {
    return 0;
  }
  return userLimit.count;
};

export const checkUserLimit = async () => {
  const userLimit = await getUserLimit();
  
  if (!userLimit || userLimit.count < MAX_FREE_COUNT) {
    return true;
  }
  
  return false;
};

// update on every time call api
export const incrementUserLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }
  const userLimit = await getUserLimit();

  if (!userLimit) {
    return await prismadb.userLimit.create({
      data: {
        count: 1,
        userId,
      },
    });
  }

  return await prismadb.userLimit.update({
    where: { userId },
    data: {
      count: { increment: 1 },
    },
  });
};

export const checkUserSubscription = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userSubscription = await prismadb.userSubscription.findUnique({
    where: { userId },
  });
  if (!userSubscription) {
    return false;
  }
  const isValid =
    userSubscription.stripePriceId && userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return !!isValid;
};
