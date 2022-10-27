import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';

import StoryBook from 'src/components/pages/storybook';
import store from 'src/redux/store';

describe('StoryBook - Unit Testing', () => {
  const customRender = () => {
    return render(
      <Provider store={store}>
        <StoryBook></StoryBook>
      </Provider>,
    );
  };

  describe('AutocompleteInput - Unit Testing', () => {
    it('Should check if autocomplete is rendering well', () => {
      const { getByTestId } = customRender();
      expect(getByTestId('autocompleteTestId')).toBeInTheDocument();
    });

    it('Should return a chip when entering a preset value and selecting it', () => {
      const { getByTestId, getByPlaceholderText, getByText } = customRender();

      const input = getByPlaceholderText('Select or add skill');
      fireEvent.change(input, {
        target: {
          value: 'Re',
        },
      });
      const tag = getByText('React');
      fireEvent.click(tag);

      expect(getByTestId('react')).toBeInTheDocument();
    });

    it('Should return a chip when entering a value and pressing enter', () => {
      const { getByTestId, getByPlaceholderText } = customRender();
      const input = getByPlaceholderText('Select or add skill');
      fireEvent.change(input, {
        target: {
          value: 'test',
        },
      });
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(getByTestId('test')).toBeInTheDocument();
    });
  });

  describe('Checkbox input - Unit testing', () => {
    it('should the checkbox is rendering well', () => {
      const { getByText } = customRender();

      expect(getByText('TL')).toBeInTheDocument();
      expect(getByText('PM')).toBeInTheDocument();
      expect(getByText('DEV')).toBeInTheDocument();
      expect(getByText('QA')).toBeInTheDocument();
      expect(getByText('UXUI')).toBeInTheDocument();
    });
  });

  describe('DatePicker - Unit Test', () => {
    it('Should render Date Picker on Storybook', () => {
      const { getByTestId } = customRender();

      expect(getByTestId('datePickerTestId')).toBeInTheDocument();
    });
  });

  describe('Toggle button- Unit Test', () => {
    it('Should render toggle button on storybook', () => {
      const { getByTestId } = customRender();

      expect(getByTestId('toggleButtonTestId')).toBeInTheDocument();
    });
  });
});
