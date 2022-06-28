import { ROUTE_NAMES } from '@/route-names';
import { TokenService } from '@services/token.service';
import { NavigationGuard, Route } from 'vue-router';

const AuthGuardFactory: (tokenSvc: TokenService) => NavigationGuard = (tokenSvc: TokenService) => (to: Route, from: Route, next) => {
  const token = tokenSvc.getToken();

  if (to.name === ROUTE_NAMES.CLIENT_APP || to.name === ROUTE_NAMES.CLIENT_LOGIN) {
    return next({
      name: ROUTE_NAMES.CLIENT_LOGIN,
      replace: true,
    });
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
