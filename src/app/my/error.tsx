'use client';

import { BasicError } from '@/components';

export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return <BasicError reset={reset} />;
}
