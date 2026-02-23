import { render, screen } from '@testing-library/react';
import App from './App';

test('renders task app heading', () => {
  render(<App />);
  expect(screen.getByText(/task app/i)).toBeInTheDocument();
});
