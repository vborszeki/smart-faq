// @flow

import * as React from 'react';
import css from 'styled-jsx/css';
import { Typography, Button } from '@kiwicom/orbit-components';
import BackButton from '../common/BackButton';
import CloseIcon from '../common/CloseIcon';
import Input from '../common/Input';
import image from '../../static/woman-with-laptop@2x.jpg';
import routeDefinitions from '../routeDefinitions';

const style = css`
  .ForgottenPassword {
    width: 480px;
    padding-top: 128px;
  }
  div.picture img {
    width: 203px;
    height: 156px;
  }
  div.picture {
    margin-left: 150px;
    margin-bottom: 68px;
  }
  div.main {
    margin-left: 40px;
    margin-right: 40px;
  }
  p.title {
    color: #171b1e;
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 8px;
    line-height: 1.2;
  }
  form {
    margin: 32.8px 40px 0px 40px;
  }
  div.input {
    display: inline-block;
    width: 300px;
    height: 44px;
    margin-top: 4px;
    margin-right: 8px;
  }
`;

type Props = {
  history: {
    push: string => void,
  },
};

type State = {|
  email: string,
|};

class ForgottenPasword extends React.Component<Props, State> {
  state = {
    email: '',
  };

  handleChangeEmail = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ email: e.target.value });
  };

  handleSubmitEmail = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.props.history.push(routeDefinitions.CHECK_RECOVERY_LINK);
  };

  render() {
    return (
      <div className="ForgottenPassword">
        <CloseIcon />
        <BackButton text="Back" link={routeDefinitions.KIWI_LOGIN} />
        <div className="picture">
          <img alt="Help" src={image} />
        </div>
        <div className="main">
          <p className="title">Forgotten password</p>
          <Typography type="secondary">
            {`Please enter your email address. We'll send you instructions to reset your password.`}{' '}
          </Typography>
        </div>
        <form onSubmit={this.handleSubmitEmail}>
          <label htmlFor="email">
            <div>Email:</div>
            <div className="input">
              <Input
                type="email"
                value={this.state.email}
                onChange={this.handleChangeEmail}
                placeholder="e.g. your@email.com"
                required
              />
            </div>
          </label>
          <Button
            isDisabled={false}
            onClick={() => {}}
            size="large"
            title="Send"
            type="primary"
          />
        </form>
        <style jsx>{style}</style>
      </div>
    );
  }
}
export default ForgottenPasword;
