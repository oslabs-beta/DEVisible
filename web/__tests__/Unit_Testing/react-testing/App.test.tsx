/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, RenderResult } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import renderer from 'react-test-renderer';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import App from '../../../frontend/src/App';

const renderWithRouter = (ui: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    user: userEvent.setup(),
    ...render(ui),
  };
};

describe('Unit testing App component', () => {
  describe('React-Router route testing', () => {
    beforeEach(() => {
      fetchMock.doMock();
    });
    it('Renders landing page on start', () => {
      // Page content for default route
      const { user } = renderWithRouter(<App />);
      expect(
        screen.getByText(
          /Make tracking your microservice architecture a micro-hassle/i
        )
      ).toBeInTheDocument();
    });

    it('Renders Login component when on /login', () => {
      const route = '/login';
      const { user } = renderWithRouter(<App />, { route });
      expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    });

    it('Renders Register component when on /signup', () => {
      const route = '/signup';
      const { user } = renderWithRouter(<App />, { route });
      expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    });

    it('Renders About component when on /about', () => {
      const route = '/about';
      const { user } = renderWithRouter(<App />, { route });
      expect(screen.getByText(/^Michael Sarkisian$/)).toBeInTheDocument();
      expect(screen.getByText(/^Justin Mendonca$/)).toBeInTheDocument();
      expect(screen.getByText(/^Eden Shirin$/)).toBeInTheDocument();
      expect(screen.getByText(/^Tanner Hesterman$/)).toBeInTheDocument();
    });
  });
});
