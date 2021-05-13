import React from 'react';
import { Tab } from 'semantic-ui-react';
import { PetList } from './PetList';
import { PetListAdopted } from './PetListAdopted';

interface PetIndexProps {}

const panes = [
  {
    menuItem: 'Todos',
    render: () => (
      <Tab.Pane>
        {' '}
        <PetList />{' '}
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Adoptados',
    render: () => (
      <Tab.Pane>
        {' '}
        <PetListAdopted />{' '}
      </Tab.Pane>
    ),
  },
];

export const PetIndex: React.FC<PetIndexProps> = () => {
  return <Tab panes={panes} />;
};
