import React from 'react';
import { Divider, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { PetsData } from '../../../actions/pets/petsInterfaces';
import { toTitleCase } from '../../../util/upperCase';

interface Props {
  selectedPet: PetsData | undefined;
}

export const AdopcionDetailInfo: React.FC<Props> = ({ selectedPet }) => {
  return (
    <Segment>
      <Label as='button' color='orange' ribbon>
        {selectedPet?.interesados! === 0 &&
          `${selectedPet?.interesados!} personas interesadas`}
        {selectedPet?.interesados! === 1 &&
          `${selectedPet?.interesados!} persona interesada`}
        {selectedPet?.interesados! > 1 &&
          `${selectedPet?.interesados!} personas interesadas`}
      </Label>
      <Item.Group>
        <Item.Content>
          <Item.Header as='h1' content={toTitleCase(selectedPet?.name || '')} />
          <Divider />
          <Item.Meta>
            <Icon name='paw' /> {selectedPet?.breed}
            <br />
            <Icon name='point' />
            {selectedPet?.location}
          </Item.Meta>
          <Divider />
          <Item.Header as='h3' content='Caracteristicas' />
          <Item.Description style={{ whiteSpace: 'pre-wrap' }}>
            Tamaño <strong>{selectedPet?.size}</strong> <br />
            {selectedPet?.description}
          </Item.Description>
        </Item.Content>
      </Item.Group>
    </Segment>
  );
};
