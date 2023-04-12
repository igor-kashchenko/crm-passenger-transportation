import React from 'react';
import { CreateTrip } from '../../components/CreateTrip';
import { Trips } from '../../components/Trips';

export const TripsPage: React.FC = () => (
  <>
    <CreateTrip />

    <Trips />
  </>
);

