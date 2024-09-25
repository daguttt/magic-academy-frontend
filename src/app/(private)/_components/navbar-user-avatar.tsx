import { getUser } from '~/lib/session';

import { NavbarUserAvatarMenu } from './navbar-user-avatar-menu';

export async function NavbarUserAvatar() {
  const user = await getUser();

  return (
    <div className="relative flex items-center justify-end pr-20">
      <NavbarUserAvatarMenu
        userAvatarUrl={user.avatarUrl}
        userName={user.name}
      />
    </div>
  );
}
