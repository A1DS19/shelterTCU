import React, { Fragment } from 'react';
import { Button, Header, Segment, Icon } from 'semantic-ui-react';
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
      <FacebookShareButton url={window.location.href}>
        <Button circular color='facebook' icon='facebook' />
      </FacebookShareButton>

      <RedditShareButton url={window.location.href}>
        <Button circular color='orange' icon='reddit' />
      </RedditShareButton>

      <TwitterShareButton url={window.location.href}>
        <Button circular color='twitter' icon='twitter' />
      </TwitterShareButton>

      <WhatsappShareButton url={window.location.href}>
        <Button circular color='green' icon='whatsapp' />
      </WhatsappShareButton>

      <TelegramShareButton url={window.location.href}>
        <Button circular color='linkedin' icon='telegram plane' />
      </TelegramShareButton>
    </Fragment>
  );

  return (
    <Fragment>
      <Segment style={isMobileOnly ? { marginTop: '20px' } : {}} textAlign='center'>
        <Header style={{ marginBottom: '5px' }} as='h3'>
          Preguntar por {toTitleCase(selectedPet?.name || '')}
        </Header>

        <div style={{ marginBottom: '10px' }}>
          <Button
            circular
            color='green'
            icon='whatsapp'
            as='a'
            href={`https://wa.me/50688152514?text=${window.location.href}%20Hola,%20me%20podrian%20brindar%20informacion%20acerca%20de%20${selectedPet?.name},%20gracias.`}
            target='_blank'
          />
          <Button
            circular
            icon='mail'
            as='a'
            href='mailto:info@territoriodezaguates.com'
          />
        </div>

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
      <Segment color='red'>
        <Header>
          La mascota en adopcion va en periodo de prueba, de no adaptarse a la familia la
          mascota debe ser devuelta.
        </Header>
      </Segment>
    </Fragment>
  );
};
