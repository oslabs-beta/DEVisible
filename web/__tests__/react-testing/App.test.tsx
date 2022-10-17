/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import renderer from 'react-test-renderer';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import App from '../../frontend/src/App';

const renderWithRouter = (ui: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    user: userEvent.setup(),
    ...render(ui),
  };
};

describe('Unit testing App component', () => {
  describe('React-Router route testing', () => {
    it('Renders landing page on start', () => {
      const { user } = renderWithRouter(<App />);

      // Page content for default route
      expect(
        screen.getByText(
          /Make tracking your microservice architecture a micro-hassle/i
        )
      ).toBeInTheDocument();
    });

    it('Renders Login component from home page', async () => {
      const { container } = render(<App />);
      const loginButton = container.querySelector('.loginButton');
      await userEvent.click(loginButton as Element);
      expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    });
  });
});
