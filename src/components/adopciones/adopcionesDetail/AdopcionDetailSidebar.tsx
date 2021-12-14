import React, { Fragment } from 'react';
import { Button, Header, Segment, Icon, Label } from 'semantic-ui-react';
import { PetsData } from '../../../actions/pets/petsInterfaces';
import { Link } from 'react-scroll';
import { isMobileOnly } from 'react-device-detect';

import {
  FacebookShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from 'react-share';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from '../../../actions/auth';
import { StoreState } from '../../../reducers';
import { toTitleCase } from '../../../util/upperCase';
import { openModal } from '../../../actions/modals';
interface Props {
  selectedPet: PetsData | undefined;
  authenticated: boolean;
}

export const AdopcionDetailSidebar: React.FC<Props> = ({
  selectedPet,
  authenticated,
}) => {
  const { currentUser } = useSelector((state: StoreState) => state.auth);

  const dispatch = useDispatch();
  const renderSocialShare = () => (
    <Fragment>
      <Header
        style={{ marginTop: 0, marginBottom: '10px' }}
        as='h3'
        content='Compartir'
      />
      <FacebookShareButton
        url={`Mira a esta mascota se llama ${selectedPet?.name} ${window.location.href}`}
      >
        <Button circular color='facebook' icon='facebook' />
      </FacebookShareButton>

      <RedditShareButton
        url={`Mira a esta mascota se llama ${selectedPet?.name} ${window.location.href}`}
      >
        <Button circular color='orange' icon='reddit' />
      </RedditShareButton>

      <TwitterShareButton
        url={`Mira a esta mascota se llama ${selectedPet?.name} ${window.location.href}`}
      >
        <Button circular color='twitter' icon='twitter' />
      </TwitterShareButton>

      <WhatsappShareButton
        url={`Mira a esta mascota se llama ${selectedPet?.name} ${window.location.href}`}
      >
        <Button circular color='green' icon='whatsapp' />
      </WhatsappShareButton>

      <TelegramShareButton
        url={`Mira a esta mascota se llama ${selectedPet?.name} ${window.location.href}`}
      >
        <Button circular color='linkedin' icon='telegram plane' />
      </TelegramShareButton>
    </Fragment>
  );

  return (
    <Fragment>
      <Segment style={isMobileOnly ? { marginTop: '20px' } : {}} textAlign='center'>
        {selectedPet?.adopted === 'false' && (
          <Header style={{ marginBottom: '5px' }} as='h3'>
            Preguntar por {toTitleCase(selectedPet?.name || '')}
          </Header>
        )}

        {authenticated && selectedPet?.adopted === 'false' ? (
          <div style={{ marginBottom: '10px' }}>
            <Button
              circular
              color='green'
              icon='whatsapp'
              as='a'
              href={`https://wa.me/50684847329?text=${window.location.href}%20Hola,%20mi%20nombre%20es%20${currentUser?.name}%20${currentUser?.lastName}%20y%20mi%20cedula%20es%20${currentUser?.cedula}.%20Me%20podrian%20brindar%20informacion%20acerca%20de%20${selectedPet?.name},%20gracias.`}
              target='_blank'
            />
          </div>
        ) : (
          !authenticated &&
          selectedPet?.adopted === 'false' && (
            <Button
              style={{ marginTop: '10px', marginBottom: '8px' }}
              circular
              color='orange'
              fluid
              content={`Iniciar sesion para preguntar por ${selectedPet?.name}`}
              onClick={() => dispatch(openModal({ type: 'LoginForm' }))}
            />
          )
        )}

        {renderSocialShare()}

        {authenticated ? (
          <Button
            onClick={() => {
              dispatch(
                addFavorite(
                  currentUser?.id?.toString() as string,
                  selectedPet?.id?.toString() as string,
                  currentUser?.wishlist?.find(
                    (pet) => pet === selectedPet?.id?.toString()
                  )
                    ? true
                    : false
                )
              );
            }}
            fluid
            style={{ marginTop: '10px' }}
            basic
            size='medium'
            color='orange'
          >
            {currentUser?.wishlist?.find((pet) => pet === selectedPet?.id?.toString()) ? (
              <div>
                <Icon name='heart' /> ELIMINAR DE FAVORITOS
              </div>
            ) : (
              <div>
                <Icon name='heart outline' /> AGREGAR A FAVORITOS
              </div>
            )}
          </Button>
        ) : (
          <Button
            style={{ marginTop: '10px' }}
            circular
            color='orange'
            fluid
            content='Iniciar sesion para agregar favorito'
            onClick={() => dispatch(openModal({ type: 'LoginForm' }))}
          />
        )}
      </Segment>
      <Segment color={selectedPet?.adopted === 'true' ? 'red' : 'green'}>
        <Header>
          {selectedPet?.adopted === 'true'
            ? 'La mascota se encuentra adoptada'
            : 'La mascota esta disponible para adopción'}
        </Header>
      </Segment>
      <Segment color='red'>
        <Header>
          La mascota en adopción va en período de prueba, de no adaptarse a la familia la
          mascota debe ser devuelta.
        </Header>
      </Segment>
    </Fragment>
  );
};
