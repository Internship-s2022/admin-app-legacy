import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import store from 'src/redux/store';

import Layout from '.';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <Layout />
    </Provider>,
  );
  const linkElement = screen.getByText(/home/i);
  expect(linkElement).toBeInTheDocument();
});
