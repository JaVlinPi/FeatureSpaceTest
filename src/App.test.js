
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import App from './App';

const ERROR_TEXT = 'Unable to obtain information for that postcode. Ensure that it is typed in correctly.';

test('renders postcode lookup', () => {
  render(<App />);

  const inputText = screen.getByText('Enter Postcode:');
  const inputField = screen.getByLabelText('input');
  const submitButton = screen.getByText('Look up postcode');

  expect(inputText).toBeInTheDocument();
  expect(inputField).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test('check error appears when submit no value', async () => {
  render(<App />);
  window.alert = () => {};

  const submitButton = screen.getByText('Look up postcode');

  fireEvent.click(submitButton);

  await waitFor(() => screen.getByText(ERROR_TEXT));
  
  expect(screen.getByText(ERROR_TEXT)).toBeInTheDocument();
});



test('check error appears when an invalid postcode is submitted', async () => {
  render(<App />);
  window.alert = () => {};

  const inputField = screen.getByLabelText('input');
  fireEvent.change(inputField, { target: { value: '123456' } });

  const submitButton = screen.getByText('Look up postcode');

  fireEvent.click(submitButton);

  await waitFor(() => screen.getByText(ERROR_TEXT));
  
  expect(screen.getByText(ERROR_TEXT)).toBeInTheDocument();
});


const TEST_POSTCODE = 'CB4 0GF';
test('check information appears when a valid postcode is submitted', async () => {
  render(<App />);

  const inputField = screen.getByLabelText('input');
  fireEvent.change(inputField, { target: { value: TEST_POSTCODE } });

  const submitButton = screen.getByText('Look up postcode');

  fireEvent.click(submitButton);

  await waitFor(() => screen.getByText('Postcode: '+TEST_POSTCODE));
  
  expect(screen.queryByText(ERROR_TEXT)).toBeNull();
  expect(screen.getByText('Postcode: '+TEST_POSTCODE)).toBeInTheDocument();
  expect(screen.getByText('Nearest Postcodes')).toBeInTheDocument();
  expect(screen.getByText('Postcode: CB4 0GJ')).toBeInTheDocument();
  expect(screen.getByText('Postcode: CB4 0GD')).toBeInTheDocument();
  expect(screen.getByText('Postcode: CB4 0GH')).toBeInTheDocument();
  expect(screen.getByText('Postcode: CB4 0FZ')).toBeInTheDocument();
  expect(screen.getByText('Postcode: CB4 0GN')).toBeInTheDocument();
});

