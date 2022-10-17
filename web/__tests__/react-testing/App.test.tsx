/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import App from '../../frontend/src/App';

describe('Unit testing App component', () => {
  describe('React-Router route testing', () => {
    beforeAll(() => {
      render(<App />, { wrapper: BrowserRouter });
    });

    it('Renders landing page on start', () => {
      const user = userEvent.setup();

      // Page content for default route
      expect(
        screen.getByText(
          /Make tracking your microservice architecture a micro-hassle/i
        )
      ).toBeInTheDocument();
    });
  });
});
