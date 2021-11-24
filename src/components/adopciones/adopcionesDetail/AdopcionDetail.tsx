import React, { Fragment, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, Grid, Header, Segment } from 'semantic-ui-react';
import { Carousel } from 'react-responsive-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedPet, fetchSelectedPet } from '../../../actions/pets/pets';
import { StoreState } from '../../../reducers';
import { AdopcionDetailInfo } from './AdopcionDetailInfo';
import { AdopcionDetailSidebar } from './AdopcionDetailSidebar';
import { AdopcionDetailContact } from './AdopcionDetailContact';
import { AdopcionDetailPetBreedList } from './AdopcionDetailPetBreedList';
import { LoaderComponent } from '../../common/Loader';
import { isMobileOnly } from 'react-device-detect';
import { ErrorComponent } from '../../common/Error';
import { Link } from 'react-router-dom';

export interface MatchParams {
  id: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

export const AdopcionDetail = ({ match }: Props) => {
  const petId = match.params.id;
  const { petsData, selectedPet } = useSelector((state: StoreState) => state.pets);
  const { authenticated } = useSelector((state: StoreState) => state.auth);
  const { loading, error } = useSelector((state: StoreState) => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSelectedPet(petId.toString()!));
    return () => {
      dispatch(clearSelectedPet());
    };
  }, [dispatch, petId]);

  if (error) {
    return <ErrorComponent />;
  }

  if (loading || (!petsData && !error)) {
    return <LoaderComponent />;
  }

  if (!selectedPet) {
    return (
      <Segment placeholder>
        <Header textAlign='center' content='Mascota no existe' />
        <Button
          as={Link}
          to='/adoptions'
          primary
          style={{ marginTop: 20 }}
          content='Volver a adopciones'
        />
      </Segment>
    );
  }

  return (
    <Fragment>
      <Grid columns={3} relaxed='very'>
        <Grid.Row>
          <Grid.Column mobile={16} computer={16}>
            {selectedPet?.photosUrl && (
              <Carousel autoPlay infiniteLoop showStatus={false} showThumbs={false}>
                {selectedPet?.photosUrl!.map((photo, index) => (
                  <div
                    style={isMobileOnly ? { height: '300px' } : { height: '550px' }}
                    key={index}
                  >
                    <img src={photo} alt='pic' />
                  </div>
                ))}
              </Carousel>
            )}
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column mobile={16} computer={10}>
            <AdopcionDetailInfo selectedPet={selectedPet} />
          </Grid.Column>
          <Grid.Column mobile={16} computer={6}>
            <AdopcionDetailSidebar
              authenticated={authenticated}
              selectedPet={selectedPet}
            />
          </Grid.Column>
        </Grid.Row>

        {/* <Grid.Row id='contact-form'>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <AdopcionDetailContact
              authenticated={authenticated}
              selectedPet={selectedPet}
            />
          </Grid.Column>
        </Grid.Row> */}

        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <AdopcionDetailPetBreedList petsData={petsData} selectedPet={selectedPet} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};
