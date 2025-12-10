import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "../App.jsx";
import { FavoritesProvider } from "../context/FavoriteContext.jsx";
import { UserProvider } from "../context/UserContext.jsx";

afterEach(() => {
  cleanup();
});

describe("App", () => {
  beforeEach(() => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UserProvider>
            <FavoritesProvider>
              <App />
            </FavoritesProvider>
          </UserProvider>
        </MemoryRouter>
      </QueryClientProvider>
    );
  });
  describe("Load navigation pages correctly", function () {
    it("Nav", async () => {
      const homeElement = screen.getByText("Home");
      const catalogElement = screen.getByText("Catalog");
      const aboutElement = screen.getByText("About us");

      expect(homeElement).toBeInTheDocument();
      expect(catalogElement).toBeInTheDocument();
      expect(aboutElement).toBeInTheDocument();
    });
    it("Home page", async () => {
      const titleElement = await screen.findByText(
        "Welcome to Bookstore — your world of stories begins here.",
        { selector: "h1" }
      );
      expect(titleElement).toBeInTheDocument();
    });
    it("Catalog page", async () => {
      const catalogLink = screen.getByRole("link", { name: "Catalog" });
      await userEvent.click(catalogLink);

      const titleElement = await screen.findByText("Book Collection", {
        selector: "h1",
      });
      const placeholderElement = await screen.findByPlaceholderText("Search");

      expect(titleElement).toBeInTheDocument();
      expect(placeholderElement.placeholder).toEqual("Search");
    });
    it("About page", async () => {
      const aboutLink = screen.getByRole("link", { name: "About us" });
      await userEvent.click(aboutLink);

      const titleElement = await screen.findByText("About Us", {
        selector: "h1",
      });
      expect(titleElement).toBeInTheDocument();
    });
    it("Login page", async () => {
      const loginLink = screen.getByRole("link", { name: "Login" });
      await userEvent.click(loginLink);

      const titleElement = await screen.findByText("Log in to your account", {
        selector: "h2",
      });
      const passwordInput = await screen.findByLabelText("Password");
      const emailInput = screen.getByLabelText("Email address");

      expect(emailInput).toBeInTheDocument();
      expect(titleElement).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });
    it("Register page", async () => {
      const RegisterLink = screen.getByRole("link", { name: "Register" });
      await userEvent.click(RegisterLink);

      const titleElement = await screen.findByText("Create your account", {
        selector: "h2",
      });
      const usernameInput = await screen.findByLabelText("Username");
      const emailInput = await screen.findByLabelText("Email address");
      const passwordInput = await screen.findByLabelText("Password");
      const confirmPasswordInput = await screen.findByLabelText(
        "Confirm Password"
      );

      expect(titleElement).toBeInTheDocument();
      expect(usernameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(confirmPasswordInput).toBeInTheDocument();
    });
  });
  describe("Navigate to components", () => {
    it("navigate to book details", async () => {
      const catalogLink = screen.getByRole("link", { name: "Catalog" });
      await userEvent.click(catalogLink);

      const titleElement = await screen.findByText("Book Collection", {
        selector: "h1",
      });
      const placeholderElement = await screen.findByPlaceholderText("Search");

      expect(titleElement).toBeInTheDocument();
      expect(placeholderElement.placeholder).toEqual("Search");

      const detailsBtn = await screen.getAllByRole("link", { name: "Details" })[0];

      await userEvent.click(detailsBtn);
      await waitFor(() => {
        expect(screen.getByText("Book Details")).toBeInTheDocument();
      });
    });
  });
});
