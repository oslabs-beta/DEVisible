# DEVisble

## Description

DEVisible is a tool for monitoring metadata related to your Github repositories. DEVisible was designed with engineering managers and DevOps teams in mind with the goal of improving efficiency by aggregating and visualizing relevant repository information. There are two components that make up the DEVisible application, which are detailed separately below.

## Web Component

#### To begin using DEVisible, you will need an API key. The following steps detail the registration process:

1. Navigate to www.devisible.com using your device/browser of choice
2. Click on the register link that appears on the home page
3. Enter the required information and click register
4. You will be automatically be logged in and redirected to the dashboard -- click on the hamburger icon in the top right corner of your screen
5. Click 'account' on the drop-down menu that appears
6. Click 'View API Key'
7. This API key will be used in conjunction with the NPM package (next section)

#### Dashboard will be dynamically updated as new repos and builds are added using the NPM package

![Placeholder Image](web/frontend/src/assets/BlueD.svg)

## NPM Package

#### The NPM Package is the primary driver of DEVisible's functionality. The NPM package can be used as part of a CI/CD pipeline or directly from the command line. Metadata collected by the package will be sent to the Web Component, where account and repo build information can be viewed.

#### Installation steps

1. Install the `devisible` package from the NPM Registry:  

`npm install devisible`

2. DEVisible assumes it is being called from the git root and project root, but allows escape hatches if either of those conditions are not the case. In those cases, ensure that the NPM package is pointing to the correct location(s)  

##### If Using Package in CLI

3. Run command to manually collect repo metadata (note: this will not necessarily reflect the data at the time of pushing to Github)

`node devisible.js --apiKey api_key_goes_here --buildPath dist/ --command "npm run build"`

##### If Using Package in CI/CD Pipeline

3. Insert a new command into config.yaml file at the desired location

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
            node devisible.js --apiKey api_key_goes_here --buildPath dist/ --command "npm run build"```

4. Navigate to www.devisible.com and log in to view your updated repo information
