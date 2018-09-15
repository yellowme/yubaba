import * as React from 'react';
import {
  Collector,
  CollectorChildrenProps,
  AnimationCallback,
  CollectorData,
  CollectorActions,
} from 'yubaba';

/**
 * ## PoseMove
 */
export default class PoseMove extends React.Component<CollectorChildrenProps> {
  renderAnimation: (opts: { start: boolean; onFinish: () => void }) => React.ReactElement<{}>;

  animate: AnimationCallback = (_, onFinish, setTargetProps) => {
    // do something
  };

  render() {
    const data: CollectorData = {
      action: CollectorActions.animation,
      payload: {
        animate: this.animate,
      },
    };

    return <Collector data={data}>{this.props.children}</Collector>;
  }
}
