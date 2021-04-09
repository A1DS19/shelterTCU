import React, { Fragment } from 'react';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthPayload } from '../../actions/auth';
import { AdminMenu } from './AdminMenu';
import { isMobileOnly } from 'react-device-detect';

interface Props {
  handleSignOut: () => void;
  currentUser: AuthPayload | null;
}

export const SignedInMenu: React.FC<Props> = ({
  currentUser,
  handleSignOut,
}): JSX.Element => {
  return (
    <Fragment>
      <Menu.Item position='right'>
        <Image avatar spaced='right' src={currentUser?.photoURL || '/assets/user.png'} />
        <Dropdown
          pointing='top left'
          text={!isMobileOnly ? currentUser?.displayName : undefined}
        >
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to={`/profile/${currentUser?.id}`}
              text='MI PERFIL'
              icon='user'
            />
            <Dropdown.Item text='SALIR' icon='power' onClick={handleSignOut} />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
      {currentUser?.isAdmin === 'true' && <AdminMenu />}
    </Fragment>
  );
};
