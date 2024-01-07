
import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../types/enums.ts';


type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

export function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.NoAuth ?
      <Navigate to={AppRoute.SignIn}/> : children
  );
}
