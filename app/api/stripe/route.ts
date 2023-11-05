import prismadb from '@/lib/prismadb';
import { stripe } from '@/lib/stripe';
import { absoluteUrl } from '@/lib/utils';
import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!user || !userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userSubscription = await prismadb.userSubscription.findUnique({ where: { userId: user.id } });
    const dashboardUrl = absoluteUrl('/dashboard');

    if (userSubscription?.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: dashboardUrl,
      });
      return NextResponse.json(
        {
          url: stripeSession.url,
          status: 200,
        },
        { status: 200 },
      );
    }
    console.log(stripe);
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: dashboardUrl,
      cancel_url: dashboardUrl,
      payment_method_types: ['card'],
      customer_email: user.emailAddresses[0].emailAddress,
      mode: 'subscription',
      billing_address_collection: 'auto',
      line_items: [
        {
          price_data: {
            currency: 'USD',
            product_data: { name: 'NextAI Pro', description: 'Unlimited generations' },
            unit_amount: 10_000,
            recurring: { interval: 'month' },
          },
          quantity: 1,
        },
      ],
      metadata: { userId },
    });

    return NextResponse.json(
      {
        url: stripeSession.url,
        status: 200,
      },
      { status: 200 },
    );
  } catch (error) {
    return new NextResponse('Something went wrong', { status: 500 });
  }
}
