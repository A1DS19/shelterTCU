import React, { Fragment } from 'react';
import { Item, Segment } from 'semantic-ui-react';
import { PetsData } from '../../../actions/pets/petsInterfaces';
import { isMobileOnly } from 'react-device-detect';
import { AdopcionDetailMessage } from './AdopcionDetailMessage';

interface Props {
  selectedPet: PetsData | undefined;
  authenticated: boolean;
}

export const AdopcionDetailContact: React.FC<Props> = ({
  selectedPet,
  authenticated,
}) => {
  return (
    <Fragment>
      <Segment>
        <Item.Group>
          <Item>
            {selectedPet?.photosUrl && (
              <img
                style={{
                  borderRadius: '50%',
                  width: '120px',
                  height: '120px',
                  marginRight: '30px',
                }}
                src={selectedPet?.photosUrl![0]}
                alt='petPic'
              />
            )}
            <Item.Content
              style={{
                marginTop: '20px',
              }}
            >
              <Item.Header content={`Pregunta acerca de ${selectedPet?.name}`} />
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      {/* <AdopcionDetailMessage selectedPet={selectedPet} /> */}
    </Fragment>
  );
};
