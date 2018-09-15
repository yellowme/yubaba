import * as React from 'react';
import Yubaba from 'yubaba';
import PoseMove from './index';
import { storiesOf } from '@storybook/react';

storiesOf('yubaba-pose', module).add('PoseMove', () => (
  <div>
    <Yubaba name="pose-move">
      <PoseMove>{props => <div {...props}>sup</div>}</PoseMove>
    </Yubaba>
  </div>
));
