import React from 'react';

import AddMemberForm from 'src/components/pages/projects/projectForm/addMember/index';
import customRender from 'src/utils/customRender';

describe('Add New Member form - Unit Testing', () => {
  it('should check the header for Member Form is rendering well', () => {
    const { getByTestId } = customRender(<AddMemberForm></AddMemberForm>);
    expect(getByTestId('headerMessage')).toBeInTheDocument();
  });
});
