import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Baba, { FLIPMove } from '../../../src';
import * as Common from '../../common';
import * as Styled from './styled';

const RestoreScrollOnMount = Common.createRestoreScrollOnMount();

storiesOf('Example/ParentChild/Basic', module).add('Default', () => (
  <Common.SmallViewport>
    <Common.Toggler>
      {props => (
        <React.Fragment>
          {!!props.shown || (
            <ul>
              {Array(8)
                .fill(undefined)
                .map((_, index) => (
                  <Baba name={`card-${index}`}>
                    <FLIPMove duration={500}>
                      {baba => (
                        <Styled.Card
                          key={index}
                          onClick={() => props.toggle(`${index}`)}
                          innerRef={baba.ref}
                          style={baba.style}
                        />
                      )}
                    </FLIPMove>
                  </Baba>
                ))}

              <RestoreScrollOnMount />
            </ul>
          )}

          {!!props.shown && (
            <Baba name={`card-${props.shown}`}>
              <FLIPMove>
                {baba => (
                  <Styled.Screen
                    onClick={() => props.toggle()}
                    innerRef={baba.ref}
                    style={baba.style}
                  />
                )}
              </FLIPMove>
            </Baba>
          )}
        </React.Fragment>
      )}
    </Common.Toggler>
  </Common.SmallViewport>
));
