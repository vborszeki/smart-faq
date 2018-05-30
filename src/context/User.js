// @flow

import * as React from 'react';

import type { User, onLogin, onLogout, onSocialLogin } from '../types';

export type UserContextType = {
  user: User,
  loginToken: ?string,
  onLogin: onLogin,
  onSocialLogin: onSocialLogin,
  onLogout: onLogout,
};

export const UserContext = React.createContext(
  ({
    user: null,
    loginToken: null,
    onLogin: (email, password) => Promise.resolve({ email, password }),
    onSocialLogin: provider => Promise.resolve(provider),
    onLogout: () => Promise.resolve(true),
  }: UserContextType),
);

export const withLogin = <Props>(
  Component: React.ComponentType<{ onLogin: onLogin } & Props>,
) =>
  function withLoginHOC(props: Props) {
    return (
      <UserContext.Consumer>
        {({ onLogin }: UserContextType) => (
          <Component {...props} onLogin={onLogin} />
        )}
      </UserContext.Consumer>
    );
  };

export const withSocialLogin = <Props>(
  Component: React.ComponentType<{ onSocialLogin: onSocialLogin } & Props>,
) =>
  function withLoginHOC(props: Props) {
    return (
      <UserContext.Consumer>
        {({ onSocialLogin }: UserContextType) => (
          <Component {...props} onSocialLogin={onSocialLogin} />
        )}
      </UserContext.Consumer>
    );
  };

export const withLogout = <Props>(
  Component: React.ComponentType<{ onLogout: onLogout } & Props>,
) =>
  function withLogoutHOC(props: Props) {
    return (
      <UserContext.Consumer>
        {({ onLogout }: UserContextType) => (
          <Component {...props} onLogout={onLogout} />
        )}
      </UserContext.Consumer>
    );
  };

export const withUser = <Props>(
  Component: React.ComponentType<{ user: User } & Props>,
) =>
  function withUserHOC(props: Props) {
    return (
      <UserContext.Consumer>
        {({ user }: UserContextType) => <Component {...props} user={user} />}
      </UserContext.Consumer>
    );
  };

export const withLoginToken = <Props>(
  Component: React.ComponentType<{ loginToken: ?string } & Props>,
) =>
  function withLoginTokenHOC(props: Props) {
    return (
      <UserContext.Consumer>
        {({ loginToken }: UserContextType) => (
          <Component {...props} loginToken={loginToken} />
        )}
      </UserContext.Consumer>
    );
  };