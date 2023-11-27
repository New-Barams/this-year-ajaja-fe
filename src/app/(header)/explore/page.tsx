import { cookies } from 'next/headers';
import ExplorePlans from './_components/ExplorePlans';

export default function ExplorePage() {
  const isLogin = cookies().has('auth');
  return <ExplorePlans isLogin={isLogin} />;
}
