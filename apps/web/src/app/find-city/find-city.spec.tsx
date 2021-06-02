import { render } from '@testing-library/react';

import FindCity from './find-city';

describe('FindCity', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FindCity />);
    expect(baseElement).toBeTruthy();
  });
});
