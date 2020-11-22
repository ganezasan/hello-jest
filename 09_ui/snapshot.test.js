import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('snapshot test', () => {
  it('renders correctly with react-test-renderer', () => {
    const button = renderer.create(<Button />);

    let tree = button.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with @testing-library/react', () => {
    const button = render(<Button />);
    expect(button.container).toMatchSnapshot();
    
    // manually click the button, then its text will update to OFF
    fireEvent.click(button.getByText('ON'));
    expect(button.container).toMatchSnapshot();
    
    // manually click the button, then its text will update to ON
    fireEvent.click(button.getByText('OFF'));
    expect(button.container).toMatchSnapshot();
  }); 
});