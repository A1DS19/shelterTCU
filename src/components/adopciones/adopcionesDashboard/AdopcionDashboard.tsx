import React, { Fragment, useEffect, useState } from 'react';
import { Grid, Pagination } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../reducers/index';
import { AdopcionFilters } from './AdopcionFilter';
import { AdopcionList } from './AdopcionList';
import { AdopcionLoader } from './AdopcionLoader';
import { isMobileOnly } from 'react-device-detect';
import * as petsActions from '../../../actions/pets/pets';

export const AdopcionDashboard = (): JSX.Element => {
  const dispatch = useDispatch();
  const { petsData, page, totalPages } = useSelector((state: StoreState) => state.pets);
  const { loading } = useSelector((state: StoreState) => state.loading);

  useEffect(() => {
    dispatch(petsActions.fetchPets(page));
  }, [dispatch, page]);

  return (
    <Grid>
      {isMobileOnly && (
        <Grid.Column mobile={15} tablet={6} computer={6}>
          <AdopcionFilters />
        </Grid.Column>
      )}

      <Grid.Column mobile={16} computer={9}>
        {loading && (
          <Fragment>
            <AdopcionLoader />
            <AdopcionLoader />
            <AdopcionLoader />
            <AdopcionLoader />
          </Fragment>
        )}
        <AdopcionList loading={loading} petsData={petsData} />
      </Grid.Column>

      {!isMobileOnly && (
        <Grid.Column mobile={15} tablet={6} computer={6}>
          <AdopcionFilters />
        </Grid.Column>
      )}

      <Pagination
        activePage={page + 1}
        totalPages={totalPages}
        onPageChange={(event, data) => {
          dispatch(petsActions.updatePageNumber((data.activePage as number) - 1));
        }}
        // firstItem={null}
        // lastItem={null}
        pointing
        secondary
      />
    </Grid>
  );
};
