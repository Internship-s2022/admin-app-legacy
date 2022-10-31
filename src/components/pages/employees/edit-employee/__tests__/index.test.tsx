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
    it('should check the input for First Name is rendering well', () => {
      const { getByTestId } = customRender();
      expect(getByTestId('firstNameInput')).toBeInTheDocument();
    });
    it('should check the input for Last Name is rendering well', () => {
      const { getByTestId } = customRender();
      expect(getByTestId('lastNameInput')).toBeInTheDocument();
    });
    it('should check the input for Email is rendering well', () => {
      const { getByTestId } = customRender();
      expect(getByTestId('emailInput')).toBeInTheDocument();
    });
    it('should check the input for birthday is rendering well', () => {
      const { getByTestId } = customRender();
      expect(getByTestId('datePickerTestId')).toBeInTheDocument();
    });
    it('should check the input for seniority is rendering well', () => {
      const { getByTestId } = customRender();
      expect(getByTestId('seniorityDropdown')).toBeInTheDocument();
    });
    it('should check the input for autocomplete is rendering well', () => {
      const { getByTestId } = customRender();
      expect(getByTestId('autocompleteTestId')).toBeInTheDocument();
    });
    it('should check the input for checkbox is rendering well', () => {
      const { getByText } = customRender();

      expect(getByText('TL')).toBeInTheDocument();
      expect(getByText('PM')).toBeInTheDocument();
      expect(getByText('DEV')).toBeInTheDocument();
      expect(getByText('QA')).toBeInTheDocument();
      expect(getByText('UXUI')).toBeInTheDocument();
    });
    describe('Buttons - Unit Testing', () => {
      it('should check the button for toggleButton is rendering well', () => {
        const { getByTestId } = customRender();
        expect(getByTestId('toggleButtonTestId')).toBeInTheDocument();
      });
      it('should check the button for view more is rendering well', () => {
        const { getByTestId } = customRender();
        expect(getByTestId('viewMoreButton')).toBeInTheDocument();
      });
      it('should check the button for cancel is rendering well', () => {
        const { getByTestId } = customRender();
        expect(getByTestId('cancelButton')).toBeInTheDocument();
      });
      it('should check the button for confirm is rendering well', () => {
        const { getByTestId } = customRender();
        expect(getByTestId('confirmButton')).toBeInTheDocument();
      });
      it('should check the button for add absences is rendering well', () => {
        const { getByTestId } = customRender();
        expect(getByTestId('absencesButton')).toBeInTheDocument();
      });
      it('should check the text for absences is rendering well', () => {
        const { getByText } = customRender();
        expect(getByText('+ Agregar ausencias')).toBeInTheDocument();
      });
      it('should check the div as contain absences is rendering well', () => {
        const { getByText } = customRender();
        expect(getByText('Ausencias')).toBeInTheDocument();
      });
    });
  });
});
