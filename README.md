# Trees of Seattle

### [Deployed Site](https://trees-of-seattle.netlify.app/)

##

#### Front End
<p align="left">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
  <img src="https://img.shields.io/badge/Cypress.io-6e3596?style=for-the-badge&logo=cypress" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" />
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" />
</p>

#### [Back End](https://github.com/sam-rice/trees-of-seattle-server)
<p align="left">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express" />
  <img src="https://img.shields.io/badge/Knex.js-E34F26?style=for-the-badge" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" />
</p>

### Abstract

Trees of Seattle is a full-stack React/TypeScript web application that allows users to explore a database of trees within the Seattle metro area using an interactive map. Trees are displayed as individual map points, from which the user can navigate to a detailed view for each tree. Each tree's details include common and scientific species names, an image, approximate height, age, circumference, and more. Users can also contribute to the database by posting a tree of their own for other users to discover. The app's target user is the urban nature-lover with a taste for data and maps.

Trees of Seattle was designed with device-responsiveness in mind, and strives for a minimalistic, intuitive UI.

A Heroku-hosted [Node/Express backend](https://github.com/sam-rice/trees-of-seattle-server) serves up data from a PostgreSQL database. 

A Cypress acceptance test suite is also included with the project. See installation instructions below for running the application and/or tests locally.

### Demo

![tos-demo](https://user-images.githubusercontent.com/108169988/212793621-5a54a02b-c8b6-42cf-90ac-d678f374098f.gif)

### Project Context

Trees of Seattle was created as my final solo project for the third section (3 of 4) of Turing School of Software & Design's Front-End Development program. I was given about seven days to complete the project, and decided to make my project full-stack. I was able to self-teach myself Postgres and Knex.js within the timeframe, creating a [backend](https://github.com/sam-rice/trees-of-seattle-server) for the project that allows user-submitted data to persist, and which supports a community of users.

### Additional Dependencies

- [Leaflet.js](https://leafletjs.com/)
- [Geoapify](https://www.geoapify.com/)
- [react-modal](https://www.npmjs.com/package/react-modal)

### Installation Instructions

1. Fork this repository.
2. Clone your forked repository to your machine.
3. `cd` into the top level of the project repository from the command line and run `npm i`.
4. Run `npm start` to launch the application's server.
5. Navigate to [http://localhost:3000](http://localhost:3000) in your browser to view the live page.
6. To run the Cypress test suite, run `npm run cypress` from the command line while in the top level of the project directory.
