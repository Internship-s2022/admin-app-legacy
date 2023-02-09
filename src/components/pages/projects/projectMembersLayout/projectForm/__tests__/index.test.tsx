import React from 'react';

import ProjectForm from 'src/components/pages/projects/projectMembersLayout/projectForm/index';
import customRender from 'src/utils/customRender';

describe('Add New Project form - Unit Testing', () => {
  describe('Inputs - Unit testing', () => {
    it('should check the input for Project Name is rendering well', () => {
      const { getByTestId } = customRender(<ProjectForm />);
      expect(getByTestId('projectName')).toBeInTheDocument();
    });
    it('should check the Dropdown for Project Type is rendering well', () => {
      const { getByTestId } = customRender(<ProjectForm />);
      expect(getByTestId('projectType')).toBeInTheDocument();
    });
    it('should check the input for Client Name is rendering well', () => {
      const { getByTestId } = customRender(<ProjectForm />);
      expect(getByTestId('clientName')).toBeInTheDocument();
    });
    it('should check the Dropdown for Criticality is rendering well', () => {
      const { getByTestId } = customRender(<ProjectForm />);
      expect(getByTestId('criticality')).toBeInTheDocument();
    });
    it('should check the date picker for Start Date is rendering well', () => {
      const { getByTestId } = customRender(<ProjectForm />);
      expect(getByTestId('startDate')).toBeInTheDocument();
    });
    it('should check the Save Button is rendering well', () => {
      const { getByTestId } = customRender(<ProjectForm />);
      expect(getByTestId('saveButton')).toBeInTheDocument();
    });

    describe('Buttons - Unit Testing', () => {
      it('should check the Save Button is rendering well', () => {
        const { getByTestId } = customRender(<ProjectForm />);
        expect(getByTestId('saveButton')).toBeInTheDocument();
      });
    });
  });
});
