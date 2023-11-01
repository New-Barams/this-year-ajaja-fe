'use client';

import { RecoilRoot } from 'recoil';
import TanstackQueryProvider from './TanstackQueryProvider';

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </RecoilRoot>
  );
}
