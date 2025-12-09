import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { MemoryRouter } from "react-router"; 
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "../src/App.jsx";

describe('App', () => {
    beforeEach(() => {
        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            </QueryClientProvider>
        )
    });

    describe('Load navigation pages correctly', function () {
        it('Home page rendering', async () => {
            const logoElement = screen.getByText('LATEST BOOKS')
            const homePageElement = screen.getByText('Home')
            const catalogElement = screen.getByText('Catalog')
            const aboutElement = screen.getByText('About us')

            expect(logoElement).toBeInTheDocument();
            expect(homePageElement).toBeInTheDocument();
            expect(catalogElement).toBeInTheDocument();
            expect(aboutElement).toBeInTheDocument();
        });

        // it('Home page navigation', async () => {
        //     const homePageLink = screen.getByRole('link', { name: 'Home' });
        //     await userEvent.click(homePageLink);

        //     const titleElement = await screen.findByText(
        //         'Welcome to Bookstore — your world of stories begins here.', 
        //         { selector: 'h1' }
        //     );

        //     expect(titleElement).toBeInTheDocument();
        // });

        // it('navigate to catalog CTA', async () => {
        //     const catalogLink = screen.getByRole('link', { name: 'See our full book collection' });
        //     await userEvent.click(catalogLink);

        //     const titleElement = await screen.findByText('Book Collections', { selector: 'h1' });
        //     expect(titleElement).toBeInTheDocument();
        // });

        // it('Catalog page', async () => {
        //     const catalogLink = screen.getByRole('link', { name: 'Catalog' });
        //     await userEvent.click(catalogLink);

        //     const titleElement = await screen.findByText('Book Collections', { selector: 'h1' });
        //     const placeholderElement = await screen.findByPlaceholderText('Search');

        //     expect(titleElement).toBeInTheDocument();
        //     expect(placeholderElement).toHaveAttribute("placeholder", "Search");
        // });

        // it('About us Page', async () => {
        //     const aboutLink = screen.getByRole('link', { name: 'About us' });
        //     await userEvent.click(aboutLink);

        //     const titleElement = await screen.findByText('About Us', { selector: 'h1' });
        //     expect(titleElement).toBeInTheDocument();
        // });

        // it('Login page', async () => {
        //     const loginLink = screen.getByRole('link', { name: 'Login' });
        //     await userEvent.click(loginLink);

        //     const titleElement = await screen.findByText('Log in to your account', { selector: 'h2' });
        //     const passwordInput = await screen.findByLabelText('Password');
        //     const emailInput = await screen.findByLabelText('Email');

        //     expect(titleElement).toBeInTheDocument();
        //     expect(passwordInput).toBeInTheDocument();
        //     expect(emailInput).toBeInTheDocument();
        // });

        // it('Register page', async () => {
        //     const registerLink = screen.getByRole('link', { name: 'Register' });
        //     await userEvent.click(registerLink);

        //     const titleElement = await screen.findByText('Create your account', { selector: 'h2' });

        //     const passwordInput = await screen.findByLabelText('Password');
        //     const rePassInput = await screen.findByLabelText('Confirm Password');
        //     const emailInput = await screen.findByLabelText('Email');
        //     const usernameInput = await screen.findByLabelText('Username');

        //     expect(titleElement).toBeInTheDocument();
        //     expect(passwordInput).toBeInTheDocument();
        //     expect(emailInput).toBeInTheDocument();
        //     expect(usernameInput).toBeInTheDocument();
        //     expect(rePassInput).toBeInTheDocument();
        // });
    });

    // describe('Navigate to components', () => {
    //     it('navigate to book details', async () => {
    //         const catalogLink = screen.getByRole('link', { name: 'Catalog' });
    //         await userEvent.click(catalogLink);

    //         const titleElement = await screen.findByText('Book Collections', { selector: 'h1' });
    //         const placeholderElement = await screen.findByPlaceholderText('Search');

    //         expect(titleElement).toBeInTheDocument();
    //         expect(placeholderElement).toHaveAttribute("placeholder", "Search");

    //         const detailsBtn = await screen.findAllByRole('button');
    //         const bookLink = detailsBtn[0].closest('a');

    //         if (bookLink) {
    //             await userEvent.click(bookLink);

    //             await waitFor(() => {
    //                 expect(screen.getByText('Summary')).toBeInTheDocument();
    //                 expect(screen.getByText('Author:')).toBeInTheDocument();
    //             });
    //         }
    //     });
    // });
});
