import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import store from 'src/redux/store';

const customRender = (children) => {
  return render(<Provider store={store}>{children}</Provider>);
};

export default customRender;
