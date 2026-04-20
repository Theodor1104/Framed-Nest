'use client';

import { ReactNode } from 'react';
import CartNotification from './CartNotification';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      {children}
      <CartNotification />
    </>
  );
}
