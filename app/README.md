# **DEVisible**

[DEVisible](https://devisible.app/) is an open source tool for monitoring metadata related to your Github repositories.

DEVisible was designed with engineering managers and DevOps teams in mind with the goal of improving efficiency by aggregating and visualizing relevant repository information. There are two components that make up the DEVisible application, which are detailed separately below.

**Note:** in order to tap into the full potential of DEVisible either [Register](https://devisible.app/signup) to receive an API Key and use our hosting or visit our [GitHub](https://github.com/oslabs-beta/DEVisible) to run the app locally and customize it to your needs.

## Installation and Usage

Install the package globally using `npm install -g devisible`.

### When using in your local terminal:

Run command to manually collect repo metadata (note: this will not necessarily reflect the data at the time of pushing to Github).

`npx devisible --apiKey api_key_goes_here --buildPath dist/ --command "npm run build"`

**Note**: DEVisible assumes that it is being run from both the node package root as well as the Git repository root. If either of these are not the case, you must pass in the path to the Git root or the path to package.json manually.

Run `npx devisible -h` to see help for how to pass this info.

### When using with GitHub Actions:

Insert a `.yml` file in `.github/workflows` into your project's root. Make an account on the [DEVisible Website](https://devisible.app), copy your API Key from your account page, and add it as a [GitHub Secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets) on your repo.

This is an example YAML file to run DEVisible on every push through GitHub Actions, your needs may vary.

```jobs:
on: push
  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - name: Checkout Repo
          uses: actions/checkout@v3
        - name: Setup Node
          uses: actions/setup-node@v3
        - name: Install dependencies
          run: npm ci
        - name: Install DEVisible package
          run: npm i -g devisible
        - name: Run DEVisible NPM package
          env:
            API_KEY: ${{ secrets.devisibleKey }}
          run: |
            npx devisible --apiKey "$API_KEY" --buildPath client/dist --command "npm run build"
```

Navigate to [DEVisible](https://devisible.app/) and log in to view your updated repository information.
