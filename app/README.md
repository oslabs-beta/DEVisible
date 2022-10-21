# **DEVisible**

DEVisible is an open source tool for monitoring metadata related to your Github repositories.

DEVisible was designed with engineering managers and DevOps teams in mind with the goal of improving efficiency by aggregating and visualizing relevant repository information. There are two components that make up the DEVisible application, which are detailed separately below.

**Note:** in order to tap into the full potential of DEVisible either [Register](https://devisible.dev/signup) to receive an API Key and use our hosting or visit our [GitHub](https://github.com/oslabs-beta/DEVisible) to run the app locally and customize it to your needs.

## Installation and Usage

To install simply run the command `npm install devisible`

### When using through the CLI:

Run command to manually collect repo metadata (note: this will not necessarily reflect the data at the time of pushing to Github)

`node devisible.js --apiKey api_key_goes_here --buildPath dist/ --command "npm run build"`

**Note**: DEVisible assumes that it is being run from the project root directory, therefore please follow the following:

- devisible must either be run from the git root or passed in a valid git root as an cli argument
- devisible must either be run from the npm package root or passed in a valid path to package.json
- run devisible -h to see help for how to pass this info

### When using through the GitHub Actions:

Insert a new command into config.yaml file at the desired location

```jobs:
  build:
    steps:
      - checkout
      - run:
          name: Lint
          command: |
            eslint run
      - run:
          name: DEVisible
          command: |
            node devisible.js --apiKey api_key_goes_here --buildPath dist/ --command "npm run build"
```

Navigate to [DEVisible](https://devisible.dev/) or run an instance of the [application](<[GitHub](https://github.com/oslabs-beta/DEVisible)>) locally and log in to view your updated repository information.
