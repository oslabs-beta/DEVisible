# DEVisble

## Description

DEVisible is a tool for monitoring metadata related to your Github repositories. DEVisible was designed with engineering managers and DevOps teams in mind with the goal of improving efficiency by aggregating and visualizing relevant repository information. DEVisible was designed to be used in tandem with the [public DEVisible Website](https://devisible.app), but as an Open Source project, you can also run a self-hosted web app.

## Web Component

#### To begin using DEVisible, you will need an API key. The following steps detail the registration process:

1. Navigate to [devisible.app](https://devisible.app) using your device/browser of choice
2. Click on the register link that appears on the home page
3. Enter the required information and click register
4. You will be automatically be logged in and redirected to the dashboard -- click on the hamburger icon in the top right corner of your screen
5. Click 'Account' on the drop-down menu that appears
6. Click 'View API Key'
7. This API key will be used in conjunction with the NPM package (next section)

#### Dashboard will be dynamically updated as new repos and builds are added using the NPM package

![DEVisible Web Dashboard](web/frontend/src/assets/dashboard.png)

## NPM Package

#### The NPM Package is the primary driver of DEVisible's functionality. The NPM package can be used as part of a CI/CD pipeline or locally from the terminal. Metadata collected by the package will be sent to the Web application, where account and repo build information can be viewed.

#### Installation steps

1. Install the `devisible` package globally from the NPM Registry:  

`npm install -g devisible`

2. DEVisible assumes it is being called from the git root and project root, but allows escape hatches if either of those conditions are not the case. Run `npx devisible -h` to see help for how to pass this info.

##### If Using Package Locally

3. Pass your project's build command into the DEVisible command line parameter, along with your API key and the path of the build output. 

`npx devisible --apiKey api_key_goes_here --buildPath dist/ --command "npm run build"`

##### If Using Package in CI/CD Pipeline

3. Add your API key as a [GitHub Secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets) on your repo.

4. Insert a `.yml` file in `.github/workflows` into your project's root installing and invoking DEVisible as desired during your build step. 

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

- Navigate to www.devisible.com and log in to view your updated repo information!
