import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { Container, Icon, Menu } from 'semantic-ui-react';
import { fetchCurrentUser, signOutUser } from '../../actions/auth';
import { StoreState } from '../../reducers';
import { SignedInMenu } from './SignedInMenu';
import { SignedOutMenu } from './SignedOutMenu';
import { isMobileOnly, isMobile, isDesktop } from 'react-device-detect';

export const Navbar = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { authenticated, currentUser, userId } = useSelector(
    (state: StoreState) => state.auth
  );

  useEffect(() => {
    dispatch(fetchCurrentUser(userId));
  }, [dispatch, userId]);

  const handleLogOut = () => {
    dispatch(signOutUser());
    history.push('/');
  };

  return (
    <div id='nav'>
      <Menu inverted fixed='top'>
        <Container>
          <Menu.Item header onClick={() => history.push('/')}>
            <img src='/assets/logo.svg' alt='logo' style={{ marginRight: '15px' }} />
            {!isMobileOnly ? 'TERRITORIO DE ZAGUATES' : null}
          </Menu.Item>

          <Menu.Item as={NavLink} to='/adoptions'>
            {!isMobileOnly ? 'MASCOTAS' : <img src='/assets/pawprint.png' alt='logo' />}
          </Menu.Item>

          {authenticated ? (
            <Fragment>
              <Menu.Item as={NavLink} to={`/wishlist/${currentUser?.id}`}>
                <Icon name='heart' size='large' />
                {!isMobileOnly ? 'FAVORITOS' : null}
              </Menu.Item>
              <SignedInMenu currentUser={currentUser!} handleSignOut={handleLogOut} />
            </Fragment>
          ) : (
            <SignedOutMenu />
          )}
        </Container>
      </Menu>
    </div>
  );
};
