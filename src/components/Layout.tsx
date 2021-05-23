import React from 'react';
import { Header } from '../components/Header';

interface Props {
  page: string;
}

export const Layout: React.FunctionComponent<Props> = ({ page, children }) => (
  <div className="View">
    <Header />
    <main className={`Page Page--${ page }`}>
      { children }
    </main>
  </div>
);