import { redirect } from 'next/navigation';
import { deleteSession } from '~/lib/session';

export function GET() {
  deleteSession();
  redirect('/auth/login');
}
