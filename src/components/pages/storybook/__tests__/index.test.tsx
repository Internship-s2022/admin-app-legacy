import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, getByTestId, render } from '@testing-library/react';

import StoryBook from 'src/components/pages/storybook';
import store from 'src/redux/store';

describe('StoryBook - Unit Testing', () => {
  describe('AutocompleteInput - Unit Testing', () => {
    it('Should check if autocomplete is rendering well', () => {
      const { getByTestId } = render(
        <Provider store={store}>
          <StoryBook></StoryBook>
        </Provider>,
      );

      expect(getByTestId('autocompleteTestId')).toBeInTheDocument();
    });
    it.skip('Should return a chip when entering a value and pressing enter', () => {
      const { getByTestId, getByText } = render(
        <Provider store={store}>
          <StoryBook></StoryBook>
        </Provider>,
      );

      const autocomplete = getByTestId('autocompleteTestId');

      fireEvent.click(autocomplete);
      // fireEvent.click();
      // const chipOption = getByTestId('');

      expect(getByText('React')).toBeInTheDocument();
    });
  });
});
