import React from 'react';

import ClientForm from 'src/components/pages/clients/clientForm';
import customRender from 'src/utils/customRender';

describe('Client Form - Unit Testing', () => {
  describe('Inputs - Unit Testing', () => {
    it('Should check input for client name is rendering well', () => {
      const { getByTestId } = customRender(<ClientForm></ClientForm>);
      expect(getByTestId('clientNameInput')).toBeInTheDocument();
    });
    it('Should check input for client email is rendering well', () => {
      const { getByTestId } = customRender(<ClientForm></ClientForm>);
      expect(getByTestId('clientEmailInput')).toBeInTheDocument();
    });
    it('Should check input for local email is rendering well', () => {
      const { getByTestId } = customRender(<ClientForm></ClientForm>);
      expect(getByTestId('localEmailInput')).toBeInTheDocument();
    });
    it('Should check input for start date is rendering well', () => {
      const { getByTestId } = customRender(<ClientForm></ClientForm>);
      expect(getByTestId('startDatePickerTestId')).toBeInTheDocument();
    });
    it('Should check input for end date is rendering well', () => {
      const { getByTestId } = customRender(<ClientForm></ClientForm>);
      expect(getByTestId('endDatePickerTestId')).toBeInTheDocument();
    });
    it('Should check input for notes is rendering well', () => {
      const { getByTestId } = customRender(<ClientForm></ClientForm>);
      expect(getByTestId('notesInput')).toBeInTheDocument();
    });
  });
  describe('Buttons - Unit Testing', () => {
    it('Should check button to confirm is rendering well', () => {
      const { getByTestId } = customRender(<ClientForm></ClientForm>);
      expect(getByTestId('confirmButton')).toBeInTheDocument();
    });
    it('Should check button to cancel is rendering well', () => {
      const { getByTestId } = customRender(<ClientForm></ClientForm>);
      expect(getByTestId('cancelButton')).toBeInTheDocument();
    });
  });
});
