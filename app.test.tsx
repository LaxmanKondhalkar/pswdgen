//test password generation in the app.test.tsx file

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from './App';

describe('App', () => {
  it('generates a password', () => {
    const { getByTestId, getByText } = render(<App />);
    const passwordLengthInput = getByTestId('passwordLengthInput');
    const generateButton = getByTestId('generateButton');
console.log(passwordLengthInput);
    fireEvent.changeText(passwordLengthInput, '8');
    fireEvent.press(generateButton);

    expect(getByText(/Your password is:/)).not.toBeNull();
  });
});