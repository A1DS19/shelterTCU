import React from 'react';
import { Card, Icon, Image, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { PetsData } from '../../../actions/pets/petsInterfaces';
import { toTitleCase } from '../../../util/upperCase';

interface EventListItemProps {
  pet: PetsData;
}

export const AdopcionListItem: React.FC<EventListItemProps> = ({ pet }): JSX.Element => {
  const dispatch = useDispatch();
  const handleDelete = (eventId: any) => {
    try {
      console.log(eventId);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
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
      <Card.Content>
        <Label as='button' color='orange' ribbon>
          {pet.interesados! === 0 && `${pet.interesados!} personas interesadas`}
          {pet.interesados! === 1 && `${pet.interesados!} persona interesada`}
          {pet.interesados! > 1 && `${pet.interesados!} personas interesadas`}
        </Label>
        <div style={{ textAlign: 'center', fontSize: '1.1rem', marginTop: '10px' }}>
          <Card.Header>
            <p style={{ color: 'orange' }}>{toTitleCase(pet.name)}</p>{' '}
          </Card.Header>

          <Card.Meta>
            <p style={{ marginTop: '5px', marginBottom: '5px' }}>
              {' '}
              <Icon name='point' /> {toTitleCase(pet.location)}
            </p>
          </Card.Meta>

          <Card.Description style={{ whiteSpace: 'pre' }}>
            <p style={{ color: 'rgba(0,0,0,.4)' }}>
              {pet.description.slice(0, 30) + '...'}
            </p>
          </Card.Description>
        </div>
      </Card.Content>
    </Card>
  );
};
