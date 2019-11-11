# Overview
This is a web app that search a route from one point to another point.  
Demo: https://cm-map-demo.netlify.com/

# User Guide
0. Set up Google map api and api endpoint
- By url params: In the url, add the followings at the end:  
`?mapApiKey=yourApiKey&apiEndpoint=https://yourApiHost.org`
- By localStorage: Open browser console and set as followings: `window.localStorage.setItem('mapApiKey', yourApiKey)`  
`window.localStorage.setItem('apiEndpoint', yourApiKey)`
1. Enter start and end point
2. Click search
3. Retry if error occurs

# Technologies
I want to keep this project simply. Therefore, no design framework is used. I use minimal library to keep this demo simple. Simplicity is preferred.  
The setup is from create-react-app. No SEO is required.
- react: Main library of the web
- styled-component: To style component
- react-helmet: Add custom header from component
- React Hooks: Use functional components and react hooks to manage state and event
- Response Layout: Desktop and mobile friendly

# Development
## Setup
In terminal, type `yarn` or `npm i`
## Start Dev
In terminal, type `yarn start` or `npm start`
## Build
In terminal, type `yarn build` or `npm build`
## Test
In terminal, type `yarn test` or `npm test`

## Release
This repo is integrated into Netlify. Therefore, it will auto release once pushed to master branch. 

# Assumption
- No SEO is required. We don't need to concern about any about SEO.
- Further development is expected. So far there is only one feature and one page of the app. Therefore, designs and file structures are designed for further development. 
- Beauty and style are not the focus. 
- Theme will be further developed. Should add themeProvider if this project is extended. 
- API endpoint should be fixed in real life case. Google map api key should be provided with domain restriction. 
- No retry limit. If api response is "in progress", we will retry to fetch it again. There is no number of retry limit.
- No UI component testing is required. Manuel testing for ui is required. Otherwise, enzyme and cypress are preferred.