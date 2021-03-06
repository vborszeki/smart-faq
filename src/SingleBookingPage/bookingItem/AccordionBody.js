// @flow

import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

import AccordionBodyLeg from './AccordionBodyLeg';
import AccordionBodyLastLeg from './AccordionBodyLastLeg';
import type { AccordionBody_legs } from './__generated__/AccordionBody_legs.graphql';

type Props = {|
  legs: AccordionBody_legs,
|};

class AccordionBody extends React.Component<Props> {
  renderLegs = () => {
    const { legs } = this.props;
    return legs.map((l, li) => {
      if (li === legs.length - 1) {
        return <AccordionBodyLastLeg key={l.flightNumber} leg={l} />;
      }
      return (
        <AccordionBodyLeg key={l.flightNumber} leg={l} nextLeg={legs[li + 1]} />
      );
    });
  };
  render() {
    return (
      <React.Fragment>
        <hr />
        <div className="allLegs">{this.renderLegs()}</div>
        <style jsx>
          {`
            div.allLegs {
              padding: 16px 53px;
              padding-bottom: 40px;
            }
            hr {
              margin-top: 16px;
              margin-bottom: 0;
              border: none;
              border-bottom: 1px solid #e8edf1;
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}

export default createFragmentContainer(
  AccordionBody,
  graphql`
    fragment AccordionBody_legs on Leg @relay(plural: true) {
      flightNumber
      ...AccordionBodyLeg_leg
      ...AccordionBodyLeg_nextLeg
      ...AccordionBodyLastLeg_leg
    }
  `,
);
