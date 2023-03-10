import React from 'react';

import MemberForm from 'src/components/pages/projects/projectMembersLayout/memberForm/index';
import customRender from 'src/utils/customRender';

describe('Add New Member form - Unit Testing', () => {
  it('should check the header for Member Form is rendering well', () => {
    const { getByTestId } = customRender(<MemberForm projectId="mockedId" dropdownData={[]} />);
    expect(getByTestId('headerMessage')).toBeInTheDocument();
  });
});
