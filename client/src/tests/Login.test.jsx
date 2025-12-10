import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { UserProvider } from "../context/UserContext.jsx";
import LoginSection from "../components/login/Login.jsx";

afterEach(() => {
  cleanup();
});

describe("Login functionality", () => {
  beforeEach(() => {
    const queryClient = new QueryClient();
    render(
      <MemoryRouter>
        <UserProvider>
          <QueryClientProvider client={queryClient}>
            <LoginSection />
          </QueryClientProvider>
        </UserProvider>
      </MemoryRouter>
    );
  });
  it("Shows error when logging in with wrong password", async () => {
    const titleElement = await screen.findByText("Log in to your account", {
      selector: "h2",
    });
    const emailInput = await screen.findByLabelText("Email address");
    const passwordInput = await screen.findByLabelText("Password");
    const loginBtn = await screen.findByRole("button", { name: "Login" });

    expect(titleElement).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();

    await userEvent.type(emailInput, "peter@abv.bg");
    await userEvent.type(passwordInput, "wrongPassword");

    expect(emailInput).toHaveDisplayValue("peter@abv.bg");
    expect(passwordInput).toHaveDisplayValue("wrongPassword");

    await userEvent.click(loginBtn);

    const errorMessage = await screen.findByText("Invalid email/password", {
      exact: false,
    });
    expect(errorMessage).toBeInTheDocument();
  });
  it("Happy path", async () => {
    const titleElement = await screen.findByText("Log in to your account", {
      selector: "h2",
    });
    const emailInput = await screen.findByLabelText("Email address");
    const passwordInput = await screen.findByLabelText("Password");
    const loginBtn = await screen.findByRole("button", { name: "Login" });

    expect(titleElement).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();

    const errorMessage = screen.queryByText("Invalid username/password");
    expect(errorMessage).not.toBeInTheDocument();  
  });
});
