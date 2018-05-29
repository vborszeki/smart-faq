// @flow

import * as React from 'react';
import { NewWindow } from '@kiwicom/orbit-components/lib/icons';

const ContactPageLink = () => (
  <React.Fragment>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.kiwi.com/en/content/feedback"
    >
      Go to contact page
      <span className="inline-icon">
        <div className="open-icon">
          <NewWindow customColor="#00a991" size="small" />
        </div>
      </span>
    </a>
    <style jsx>
      {`
        a {
          text-decoration: none;
          color: #00a991;
          font-size: 14px;
          display: flex;
          align-items: center;
        }
        a .open-icon {
          margin-left: 6px;
        }
      `}
    </style>
  </React.Fragment>
);

export default ContactPageLink;