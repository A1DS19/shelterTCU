import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Header, Image, Icon, Message, Segment, Card } from 'semantic-ui-react';
import { addFavorite, getFavorite } from '../../actions/auth';
import { StoreState } from '../../reducers';
import { isMobileOnly } from 'react-device-detect';
import { Link, useHistory, useParams } from 'react-router-dom';
import { LoaderComponent } from '../common/Loader';
import { toTitleCase } from '../../util/upperCase';

interface WishlistProps {}

export const Wishlist: React.FC<WishlistProps> = ({}): JSX.Element => {
  const { currentUser } = useSelector((state: StoreState) => state.auth);
  const { wishlist } = useSelector((state: StoreState) => state.users);
  const { loading } = useSelector((state: StoreState) => state.loading);
  const { userId } = useParams<{ userId: string }>();

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getFavorite(userId));
  }, [userId, dispatch]);

  if (loading) {
    return <LoaderComponent />;
  }

  if (wishlist && wishlist?.length < 1) {
    return (
      <Message
        icon='exclamation'
        header='No tienes favoritos'
        content={<Link to='/'>Ver mascotas</Link>}
      />
    );
  }

  const renderMobileList = (): JSX.Element => {
    return (
      <React.Fragment>
        {wishlist?.map((pet) => {
          return (
            <Card key={pet._id} fluid>
              <Image
                onClick={() => {
                  history.push(`/adoption/${pet._id}`);
                }}
                style={{ cursor: 'pointer' }}
                className='img-listItem'
                fluid
                src={pet.photosUrl ? pet.photosUrl[0] : '/public/assets/pawprint.png'}
              />
              <Card.Content textAlign='center'>
                <Card.Header>{toTitleCase(pet.name)}</Card.Header>
                <Card.Description size='small'>
                  <strong>Ubicación: </strong>
                  {pet.location}
                </Card.Description>
                <Card.Description size='small'>
                  <strong>Tamaño:</strong> {pet.size}
                </Card.Description>
                {currentUser?.id?.toString() === userId && (
                  <Card.Description
                    style={{ cursor: 'pointer', marginTop: '10px' }}
                    onClick={() => {
                      dispatch(
                        addFavorite(
                          currentUser?.id?.toString() as string,
                          pet._id as string,
                          true
                        )
                      );
                    }}
                  >
                    {currentUser?.wishlist?.find((pett) => pett === pet._id) ? (
                      <div>
                        <Icon name='heart' color='orange' size='large' />
                      </div>
                    ) : (
                      <div>
                        <Icon name='heart outline' color='orange' size='large' />
                      </div>
                    )}
                  </Card.Description>
                )}
              </Card.Content>
            </Card>
          );
        })}
      </React.Fragment>
    );
  };

  const renderDesktopList = (): JSX.Element => {
    return (
      <Grid>
        {wishlist?.map((pet) => (
          <Grid.Row
            key={pet._id}
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              backgroundColor: 'white',
              border: '1px solid gray',
              margin: '10px 0',
            }}
          >
            <Image
              onClick={() => {
                history.push(`/adoption/${pet._id}`);
              }}
              style={{ cursor: 'pointer' }}
              circular
              size={isMobileOnly ? 'tiny' : 'small'}
              src={pet.photosUrl ? pet.photosUrl[0] : '/public/assets/pawprint.png'}
            />

            <Header size='huge'>{toTitleCase(pet.name)}</Header>
            <Header size='huge'>{pet.location}</Header>
            <Header size='huge'>{pet.size}</Header>

            {currentUser?.id?.toString() === userId && (
              <Header
                onClick={() => {
                  dispatch(
                    addFavorite(
                      currentUser?.id?.toString() as string,
                      pet._id as string,
                      true
                    )
                  );
                }}
                size='huge'
                style={{ marginTop: '2rem', cursor: 'pointer' }}
              >
                {currentUser?.wishlist?.find((pett) => pett === pet._id) ? (
                  <div>
                    <Icon name='heart' color='orange' />
                  </div>
                ) : (
                  <div>
                    <Icon name='heart outline' color='orange' />
                  </div>
                )}
              </Header>
            )}
          </Grid.Row>
        ))}
      </Grid>
    );
  };

  return (
    <React.Fragment>
      <Header content='MASCOTAS FAVORITAS' />
      {isMobileOnly ? renderMobileList() : renderDesktopList()}
    </React.Fragment>
  );
};

/*
<Card className='img-container' fluid as={Link} to={`/adoption/${pet._id}`}>
      <Image
        className='img-listItem'
        fluid
        label={{
          color: `${JSON.parse(pet.adopted) ? 'red' : 'green'}`,
          content: `${JSON.parse(pet.adopted) ? 'Adoptado' : 'Disponible'}`,
          ribbon: 'right',
        }}
        src={pet?.photosUrl?.length! > 0 ? pet.photosUrl![0] : '/assets/pet-house.png'}
      />
      <Card.Content textAlign='center'>
        <Card.Header>
          {' '}
          <p style={{ color: 'orange' }}>{toTitleCase(pet.name)}</p>{' '}
        </Card.Header>
        <Card.Meta>
          <Icon name='point' /> {pet.location}
        </Card.Meta>
        <Card.Description style={{ whiteSpace: 'pre' }}>
          {pet.description.slice(0, 30) + '...'}
        </Card.Description>
      </Card.Content>
    </Card>
*/
