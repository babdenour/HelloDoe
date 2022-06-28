import { ROUTE_NAMES } from '@/route-names';
import { TokenService } from '@services/token.service';
import { NavigationGuard } from 'vue-router';

const AuthGuardFactory: (tokenSvc: TokenService) => NavigationGuard = (tokenSvc: TokenService) => (
  to,
  _,
  next
) => {
  const token = tokenSvc.getToken();
  if (to.name === ROUTE_NAMES.CLIENT_LOGIN) {
    return next();
  }

  if (!token) {
    const redirect = to.fullPath;
    return next({
      name: ROUTE_NAMES.CLIENT_LOGIN,
      query: { redirect },
      replace: true,
    });
  }

  return next();
};

export default AuthGuardFactory;
