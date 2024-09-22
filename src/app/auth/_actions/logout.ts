import { redirect } from 'next/navigation';
import { deleteSession } from '~/lib/session';

export async function logoutAction() {
  deleteSession();
  redirect('/auth/login');
}
