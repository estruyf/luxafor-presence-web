import React from 'react';
import Button from '@material-ui/core/Button';
import { Account } from "msal";
import './Footer.css';
import GitHub from '@material-ui/icons/GitHub';
import Copyright from '@material-ui/icons/Copyright';

export interface FooterProps {}

export const Footer = (props: FooterProps) => {
  
  return (
    <footer className="app__footer">
      <Button href="https://www.eliostruyf.com" title="Go to the website of Elio Struyf">Copyright <Copyright /> Elio Struyf - https://www.eliostruyf.com</Button> - <Button href="https://github.com/estruyf" className="app__footer_github"><GitHub /></Button>
    </footer>
  );
};