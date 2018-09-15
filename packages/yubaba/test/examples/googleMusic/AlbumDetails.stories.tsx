import * as React from 'react';
import { storiesOf } from '@storybook/react';
import data from './data';
import AlbumDetails from './AlbumDetails';

storiesOf('yubaba/Examples/GoogleMusic/Components/AlbumDetails', module).add('default', () => (
  <AlbumDetails {...data[0]} baba="" shrink wait />
));
