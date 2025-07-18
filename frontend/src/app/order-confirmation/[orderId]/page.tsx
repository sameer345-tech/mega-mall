import { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import OrderConfirmationPage from '@/components/checkout/OrderConfirmationPage';
import CheckoutSkeleton from '@/components/checkout/CheckoutSkeleton';
import ErrorBoundary from '@/components/shop/ErrorBoundary';

interface OrderConfirmationProps {
  params: Promise<{
    orderId: string;
  }>;
}

export async function generateMetadata({ params }: OrderConfirmationProps): Promise<Metadata> {
  const { orderId } = await params;
  return {
    title: `Order Confirmation - ${orderId} | Mega Mall`,
    description: 'Your order has been successfully placed. View your order details and tracking information.',
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function OrderConfirmation({ params }: OrderConfirmationProps) {
  const { orderId } = await params;

  if (!orderId) {
    notFound();
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<CheckoutSkeleton />}>
        <OrderConfirmationPage orderId={orderId} />
      </Suspense>
    </ErrorBoundary>
  );
}
