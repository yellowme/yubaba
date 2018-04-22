import * as React from 'react';
import { unstable_renderSubtreeIntoContainer, unmountComponentAtNode } from 'react-dom';
import Collecter, { CommonProps, AnimationCallback, Data, Actions } from '../Collector';
import { calculateHypotenuse } from '../../lib/math';
import { calculateWindowCentre, calculateElementCenterInViewport } from '../../lib/dom';
import SimpleKeyframe from '../SimpleKeyframe';

interface Props extends CommonProps {
  background: string;
  duration?: number;
}

/**
 * CircleExpand will animate a circle from the entire window
 * to cover end target, and then fade out.
 *
 * Generally you will use CircleExpand and CircleShrink together
 * to seamlessly transition the background between pages.
 *
 * @export
 * @class CircleExpand
 * @extends {React.Component<Props>}
 */
export default class CircleExpand extends React.Component<Props> {
  static defaultProps = {
    duration: 500,
  };

  renderAnimation: (at: number) => Promise<void>;
  finishCleanup: () => void;

  prepare = () => {
    return Promise.resolve();
  };

  abort = () => {};

  cleanup = () => {
    this.finishCleanup();
  };

  afterAnimate = () => {
    return this.renderAnimation(1);
  };

  animate: AnimationCallback = data => {
    return new Promise(resolve => {
      window.requestAnimationFrame(() => {
        const duration = this.props.duration as number;
        const minSize = Math.min(data.fromTarget.size.width, data.fromTarget.size.height);
        const fromTargetHypotenuse = calculateHypotenuse(data.fromTarget.size);
        const fromTargetCenterInViewport = calculateElementCenterInViewport(data.fromTarget);
        const viewportCenter = calculateWindowCentre();
        const windowHypotenuse = calculateHypotenuse({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        const difference = {
          width: viewportCenter.left - fromTargetCenterInViewport.left,
          height: viewportCenter.top - fromTargetCenterInViewport.top,
        };
        const hypotenuseDifference = calculateHypotenuse(difference);
        const scale = Math.ceil((windowHypotenuse + hypotenuseDifference) / minSize);
        const elementToMountChildren = document.createElement('div');
        document.body.appendChild(elementToMountChildren);

        this.renderAnimation = (at: number) => {
          return new Promise(resolve => {
            unstable_renderSubtreeIntoContainer(
              data.caller,
              <SimpleKeyframe
                style={{
                  left:
                    data.fromTarget.location.left -
                    (fromTargetHypotenuse - data.fromTarget.size.width) / 2,
                  top:
                    data.fromTarget.location.top -
                    (fromTargetHypotenuse - data.fromTarget.size.height) / 2,
                  width: fromTargetHypotenuse,
                  height: fromTargetHypotenuse,
                  borderRadius: '50%',
                  position: 'absolute',
                  background: this.props.background,
                  zIndex: 10000,
                  transition: `transform ease-in ${duration}ms, opacity ease-in ${duration / 2}ms`,
                  transform: 'scale(1)',
                  opacity: 1,
                }}
                keyframes={[
                  {
                    transform: `scale(${scale})`,
                  },
                  {
                    transform: `scale(${scale})`,
                    opacity: 0,
                  },
                ]}
                at={at}
                onFinish={resolve}
              />,
              elementToMountChildren
            );
          });
        };

        this.finishCleanup = () => {
          unmountComponentAtNode(elementToMountChildren);
          document.body.removeChild(elementToMountChildren);
        };

        this.renderAnimation(0).then(resolve);
      });
    });
  };

  render() {
    const data: Data = {
      action: Actions.animation,
      payload: {
        animate: this.animate,
        abort: this.abort,
        beforeAnimate: this.prepare,
        cleanup: this.cleanup,
        afterAnimate: this.afterAnimate,
      },
    };

    return <Collecter data={data}>{this.props.children}</Collecter>;
  }
}
