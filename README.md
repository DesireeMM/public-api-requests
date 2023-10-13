# Treehouse FSJS Techdegree Unit 4 Project

Learn more about the developer on [LinkedIn](https://www.linkedin.com/in/desiree-morimoto-9470481b0/)

## Table of Contents
- [Project Description](#overview)
- [Technologies Used](#technologiesused)
- [Added Features](#addedfeatures)
- [CSS Styling Changes](#styling)

## Project Information

#### <a name="overview"></a>Description
This project involved creating a dynamic display of random employees from a public API call.

#### <a name="technologiesused"></a>Technologies Used
- CSS (project file provided by Treehouse)
  - minimal changes made to add personalization
- HTML (project file provided by Treehouse)
- JavaScript

#### <a name="addedfeatures"></a>Added Features
- app.js
  - Make a single fetch request to [The Random User Generator API](https://randomuser.me/) and use the response data to display 12 random users with the following information.
    - Thumbnail image
    - First and last name
    - Email
    - City
  - When the employee cards are clicked, pop up a modal window with more details.
    - Thumbnail image
    - Full name
    - Email
    - City
    - Cell Number
    - Full address
    - Birthday
  - The modal window includes a close button, as well as previous and next buttons to cycle through employees.
  - I've added a search feature to filter results.

#### <a name="styling"></a>CSS Styling
As an added challenge, I've changed up some of the default styling.
- Font
  - I changed the font family from Nunito to a mix of Bebas Neue and Montserrat.
  - I changed my H1 font size from 1.25em to 2.5em, as the new font was smaller.
  - I changed the font of the H3 for employee name on the modal container to Bebas Neue.
    - I also changed the font size to 2em.
  - I added top padding of 1.5% to the search container to make the element appear more inline with the H1.