import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import store from 'src/redux/store';

import EditEmployee from '..';

describe('Edit Employee page - Unit Testing', () => {
  const customRender = () => {
    return render(
      <Provider store={store}>
        <EditEmployee></EditEmployee>
      </Provider>,
    );
  };

  describe('Inputs - Unit testing', () => {
    it('should the input of First Name is rendering well', () => {
      const { getByTestId } = customRender();
      expect(getByTestId('firstNameInput')).toBeInTheDocument();
    });
    it('should the input of Last Name is rendering well', () => {
      const { getByTestId } = customRender();
      expect(getByTestId('lastNameInput')).toBeInTheDocument();
    });
    it('should the input of Email is rendering well', () => {
      const { getByTestId } = customRender();
      expect(getByTestId('emailInput')).toBeInTheDocument();
    });
    it('should the input of birthday is rendering well', () => {
      const { getByTestId } = customRender();
      expect(getByTestId('datePickerTestId')).toBeInTheDocument();
    });
    it('should the input of seniority is rendering well', () => {
      const { getByTestId } = customRender();
      expect(getByTestId('seniorityDropdown')).toBeInTheDocument();
    });
    it('should the input of autocomplete is rendering well', () => {
      const { getByTestId } = customRender();
      expect(getByTestId('autocompleteTestId')).toBeInTheDocument();
    });
    it('should the input of checkbox is rendering well', () => {
      const { getByText } = customRender();

      expect(getByText('TL')).toBeInTheDocument();
      expect(getByText('PM')).toBeInTheDocument();
      expect(getByText('DEV')).toBeInTheDocument();
      expect(getByText('QA')).toBeInTheDocument();
      expect(getByText('UXUI')).toBeInTheDocument();
    });
    describe('Buttons - Unit Testing', () => {
      it('should the input of toggleButton is rendering well', () => {
        const { getByTestId } = customRender();
        expect(getByTestId('toggleButtonTestId')).toBeInTheDocument();
      });
      it('should the button of view more is rendering well', () => {
        const { getByTestId } = customRender();
        expect(getByTestId('viewMoreButton')).toBeInTheDocument();
      });
      it('should the button of cancel is rendering well', () => {
        const { getByTestId } = customRender();
        expect(getByTestId('cancelButton')).toBeInTheDocument();
      });
      it('should the button of confirm is rendering well', () => {
        const { getByTestId } = customRender();
        expect(getByTestId('confirmButton')).toBeInTheDocument();
      });
    });
  });
});
