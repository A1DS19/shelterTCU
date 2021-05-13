import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Header, Image, Icon } from 'semantic-ui-react';
import { addFavorite, getFavorite } from '../../actions/auth';
import { StoreState } from '../../reducers';
import { isMobileOnly } from 'react-device-detect';
import { useHistory, useParams } from 'react-router-dom';
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

          <Header size='huge'> {toTitleCase(pet.name)}</Header>
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
