import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Icon, Image, Menu } from 'semantic-ui-react';
import { isMobileOnly } from 'react-device-detect';

export const AdminMenu = () => {
  return (
    <Menu.Item>
      <Icon name='setting' style={{ color: 'white' }} size='big' />
      <Dropdown pointing='top left' text='Admin'>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to='/admin/pets' icon='paw' text='Mascotas' />
          <Dropdown.Item as={Link} to='/admin/users' icon='user' text='Usuarios' />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};
