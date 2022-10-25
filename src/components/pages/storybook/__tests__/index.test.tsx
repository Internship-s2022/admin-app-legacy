import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import StoryBook from 'src/components/pages/storybook';
import store from 'src/redux/store';

describe('StoryBook - Unit Testing', () => {
  it('Should check if autocomplete is rendering well', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoryBook></StoryBook>
      </Provider>,
    );

    expect(getByTestId('autocompleteTestId')).toBeInTheDocument();
  });
});
