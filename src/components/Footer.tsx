import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import React from 'react';
import { Button, Grid, Header, Icon, Label, List, Segment } from 'semantic-ui-react';
import { TextInput } from './common/TextInput';
import { newsLetterValidationSchema } from './common/validationSchemas';
import { Link } from 'react-scroll';
import { ErrorLabel } from './common/ErrorLabel';

interface newsLetterValuesProp {
  email: string;
  error?: string;
}

export const Footer = () => {
  const initialValues = {
    email: '',
  };

  return (
    <Segment style={{ marginTop: '50px' }}>
      <Header as='h2' textAlign='center' content='TERRITORIO DE ZAGUATES' />

      <Grid>
        <Grid.Column mobile={16} tablet={10} computer={10} floated='left'>
          <Header as='h3' content='INFO' />
          <List>
            <List.Item>
              <List.Icon name='building' />
              <List.Content content='Territorio de Zaguates' />
            </List.Item>

            <List.Item>
              <List.Icon name='location arrow' />
              <List.Content content='Heredia, Costa Rica' />
            </List.Item>

            <List.Item>
              <List.Icon name='phone' />
              <List.Content content='+506 8815 2514' />
            </List.Item>

            <List.Item>
              <List.Icon name='mail' />
              <List.Content content='info@territoriodezaguates.com' />
            </List.Item>
          </List>
        </Grid.Column>

        <Grid.Column mobile={16} tablet={2} computer={2} floated='right'>
          <Header as='h3' content='SIGUENOS' />
          <Button
            circular
            color='facebook'
            icon='facebook'
            as='a'
            href={`https://www.facebook.com/territoriodezaguates/`}
            target='_blank'
          />
          <Button
            circular
            color='instagram'
            icon='instagram'
            as='a'
            href={`https://www.instagram.com/territorio_de_zaguates/?hl=en`}
            target='_blank'
          />
        </Grid.Column>
      </Grid>

      <Link to='nav' spy={true} smooth={true}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'black',
          }}
        >
          <h4>VOLVER ARRIBA</h4>
          <Icon name='arrow up' />
        </div>
      </Link>
    </Segment>
  );
};
