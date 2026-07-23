# PW_Assessment_260723

Playwright + TypeScript tests for the Product Manager demo app:
https://softwaremind-assessments.s3.us-east-1.amazonaws.com/login.html

The suite covers user registration, login (with field validations) and the product CRUD
flow, using the Page Object Model.

## Install

You need Node.js (LTS) installed. Then:

```bash
npm install
npx playwright install chromium
cp .env.example .env
```

The `.env` file holds the base URL and the credentials used by the tests (`BASE_URL`,
`TEST_USERNAME`, `TEST_PASSWORD` and `REGISTER_PASSWORD`). The template values already
work, since the demo credentials are shown on the app's own login page.

## Run the tests

```bash
npm test              # run the whole suite
npm run test:headed   # same thing, but watching the browser
npm run report        # open the HTML report of the last run
```

On CI (GitHub Actions) the same variables come from repository secrets instead of `.env`.

## How I worked through each part

### Part I: project setup

I created the folder with `mkdir PW_Assessment_260723`, moved into it with `cd` and
opened it in the editor (`code .` for VS Code, or just opening the folder in Cursor).
Playwright was installed inside it, and I added the dotenv package with a `.env` file to
keep the base URL and test credentials out of the code.

### Part II: user registration (Scenario A)

First I opened the app in the browser, created an account and clicked around to
understand the flows before automating anything. The test then follows Scenario A: from
the login page it clicks "Register here", registers a user with a random username and
email (so it can run repeatedly) and checks the app redirects back to the login page.
Code: `pages/register-page.ts` and `tests/registration.spec.ts`.

### Part III: login and field validation (Scenario B)

`tests/login.spec.ts` has three tests. Submitting the form empty shows "Username is
required" and "Password is required". Wrong credentials show "Invalid username or
password". Valid credentials (from `.env`) redirect to the dashboard (`index.html`).

### Part IV: CRUD flow (Scenario C)

The logged-in pre-condition is solved by `tests/auth.setup.ts`: it logs in once and saves
the session with `storageState`, so the product test starts already authenticated. The
test creates "Automation Laptop [random id]", checks it shows up in the list, filters by
Electronics, then deletes it (confirming the modal) and checks it is gone. Code:
`pages/dashboard-page.ts` and `tests/products.spec.ts`.

### Part V: reporting

The HTML report is enabled in `playwright.config.ts` (`reporter: 'html'`) and generated
on every run; `npm run report` opens it. Screenshots are taken on failure and a trace is
recorded when a failed test retries.

## Decisions and trade-offs

- The app is front-end only (everything lives in localStorage), so the login and CRUD
  tests use the demo `admin` user instead of the registered one, keeping tests independent.
- The auth setup checks "Remember me" so the session lands in localStorage, which
  `storageState` can capture (it cannot save sessionStorage).
- The product form requires a SKU the assessment does not mention, so the test fills a
  random one.
- Chromium only, to keep the setup simple.
