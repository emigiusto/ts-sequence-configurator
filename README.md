# Puppeteer sequence configurator

[Confluence](https://cludosearch.atlassian.net/wiki/home)

Puppeteer sequence configurator is a standalone web app that facilitates the configuration of crawlers that use puppeteersequence as a crawler extension. This is a tool intended for internal use.

This repository uses [Cludo.WebRenderService](https://github.com/Cludo/Cludo.WebRenderService) as service to test sequences.

## Getting Started

### Prerequisites

Start by installing the latest Node.js and npm

https://www.npmjs.com/get-npm

### Installing

Once you have npm installed, clone this repository by opening it in the Github desktop client or via command line:

```
git clone https://github.com/Cludo/puppeteer-sequence-configurator.git
```

While you're in the project root directory, install all package dependencies:
```
npm install
```

### Running locally 
To serve the application locally on http://localhost:3005/assets/async-configurator, run the following command on the terminal:
```
npm start
```


### Coding style

We also use eslint to maintain consistent code style including spacing, bracket alignment, etc. Run eslint tests:

```
npm run lint
```
