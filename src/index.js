// @flow

/*  eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import Raven from 'raven-js';
import KeenTracking from 'keen-tracking';

import App from './App';
import { socialLogin } from './helpers/Auth';
import { Requester } from './helpers/Requests';
import type { User } from './types';
import { type LogEvent, type EventPayload } from './helpers/analytics/cuckoo';

type Props = {||};

type State = {|
  user: User,
  loginToken: ?string,
  helpQuery: ?string,
  open: boolean,
|};

const user = {
  id: '1',
  email: 'joe.doe@example.com',
  firstname: 'Joe',
  lastname: 'Doe',
};

class Root extends React.Component<Props, State> {
  cookieKey: string;

  constructor(props) {
    super(props);

    this.cookieKey = 'mockedLogin';

    const loginToken = Cookies.get(this.cookieKey);

    this.setupLogs();
    //
    // Cypress Querys
    //
    const paramsString = window.location.search;
    const params = new URLSearchParams(paramsString);
    const helpQueryString = params.get('help');

    this.state = {
      user: loginToken ? user : null,
      loginToken,
      helpQuery: helpQueryString,
      open: true,
    };
    this.setupLogs();
    this.setupTracker();
  }
  setupTracker = () => {
    const keen = new KeenTracking({
      projectId: process.env.KEENIO_PROJECTID,
      writeKey: process.env.KEENIO_WRITEKEY,
    });
    const stagingCuckoo = {
      infinario: (eventName: LogEvent, payload: EventPayload) => {
        console.info('Event recorded to KeenIO',eventName, payload); //eslint-disable-line
        keen.recordEvent(eventName, payload);
      },
    };
    window.cuckoo = stagingCuckoo;
  };
  setupLogs = () => {
    if (
      process.env.NODE_ENV === 'production' &&
      process.env.SENTRY_URL_STAGING
    ) {
      window.Raven = Raven;
      Raven.config(process.env.SENTRY_URL_STAGING).install();
    }
  };
  onLogin = async (email, password) => {
    const loginToken = await Requester.login(email, password);
    this.setState({ user, loginToken });
    Cookies.set(this.cookieKey, loginToken);

    return Promise.resolve(user);
  };

  onSocialLogin = async provider => {
    const authUrl = await socialLogin(provider);

    if (!authUrl) {
      return;
    }

    window.location = authUrl;
  };

  onLogout = async () => {
    this.setState({ user: null, loginToken: null });
    Cookies.remove(this.cookieKey);
  };
  toggleApp = () => {
    const isOpen = this.state.open;
    this.setState({ open: !isOpen });
  };
  closeApp = () => {
    this.setState({ open: false });
  };

  render() {
    const { helpQuery } = this.state;
    const language = 'en';
    const route = helpQuery ? helpQuery : '/';
    return (
      <div className="root">
        <div
          className="toggler"
          onKeyUp={() => {}}
          role="button"
          tabIndex="-1"
          onClick={this.toggleApp}
        >
          Toggle SmartFAQ
        </div>
        <App
          onClose={this.closeApp}
          onLogin={this.onLogin}
          onSocialLogin={this.onSocialLogin}
          onLogout={this.onLogout}
          language={language}
          isOpen={this.state.open}
          user={this.state.user}
          route={route}
          loginToken={this.state.loginToken}
        />
        <style jsx global>
          {`
            body {
              background: rgba(0, 0, 0, 0.5);
            }
            .root {
              position: fixed;
              right: 0;
              top: 0;
            }
            .toggler {
              position: fixed;
              top: 20px;
              left: 20px;
              cursor: pointer;
              color: white;
              border: 3px solid green;
              padding: 5px;
              outline: none;
              background: green;
            }
          `}
        </style>
      </div>
    );
  }
}

(() => {
  const root = document.createElement('div');
  root.setAttribute('id', 'root');

  if (!document.body) {
    throw new Error('No browser?');
  }

  document.body.appendChild(root);

  const id = document.getElementById('root');

  if (!id) {
    throw new Error('Root element is missing!');
  }

  ReactDOM.render(<Root />, id);
})();
