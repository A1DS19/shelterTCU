import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Menu, Dropdown } from 'semantic-ui-react';
import { openModal } from '../../actions/modals';
import { isMobileOnly } from 'react-device-detect';

export const SignedOutMenu = (): JSX.Element => {
  const dispatch = useDispatch();

  const handleAuth = (button: 'login' | 'register') => {
    if (button === 'login') {
      dispatch(openModal({ type: 'LoginForm' }));
    } else {
      dispatch(openModal({ type: 'RegisterForm' }));
    }
  };

  const renderButtons = () => {
    return (
      <Dropdown text='OPCIONES'>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Button}
            basic
            inverted
            content='LOGIN'
            onClick={() => handleAuth('login')}
          />
          <Dropdown.Item
            as={Button}
            basic
            inverted
            content='REGISTRO'
            onClick={() => handleAuth('register')}
          />
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return (
    <Fragment>
      <Menu.Item position='right'>
        {!isMobileOnly ? (
          <Fragment>
            <Button basic inverted content='LOGIN' onClick={() => handleAuth('login')} />
            <Button
              style={{ marginLeft: '0.5em' }}
              basic
              inverted
              content='REGISTRO'
              onClick={() => handleAuth('register')}
            />
          </Fragment>
        ) : (
          renderButtons()
        )}
      </Menu.Item>
    </Fragment>
  );
};
