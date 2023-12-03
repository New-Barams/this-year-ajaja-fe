'use client';

import { Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil';
import TanstackQueryProvider from './TanstackQueryProvider';

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
      <Toaster />
    </RecoilRoot>
  );
}
