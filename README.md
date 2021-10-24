# PWA Budget-Tracker

## Description
A Progressive Web Application that allows users to add expenses or deposits to calculate their budget. Users are able to use the app whether they are offline or online. If the user is offline and adds items to their budget, when back online the database is updated. The key feature here is the use of IndexedDB which is used to store the data while offline.

## Table of Contents
- [Features](#features)
- [User Story](#user-story)
- [Link to Deployed App](#link-to-deployed-app)
- [Technologies](#technologies)
- [Installation](#installation)
- [Screenshots](#screenshot)
- [License](#license)
- [Questions](#questions)


## Features
- Enter deposits or expenses while offline
- Budget Tracker is updated when the app is brought back online

## User Story 
```
AS AN avid traveler
I WANT to be able to track my withdrawals and deposits with or without a data/internet connection
SO THAT my account balance is accurate when I am traveling
```
## Link to Deployed App
The app is deployed to heroku, [here](https://desolate-scrubland-66310.herokuapp.com/).

## Technologies
 - Node.js
 - Express.js
 - MongoDB
 - Mongoose
 - Morgan npm package
 - Heroku was used to deploy the app

## Installation
Run `npm i` to install dependencies, app used a MongoDB. 

## Screenshots
<img width="250x250" alt="sample app photo" src="https://user-images.githubusercontent.com/84414488/138577115-d114db68-ec6e-4829-83d7-dad251d9774e.png">
<br>
Data in the IndeedDB while network is offline
<img width="250x250" alt="data in IndexedDB while offline" src="https://user-images.githubusercontent.com/84414488/138577127-a6a751b8-c38d-4e7b-9359-f7e17ba1643d.png">
<br>
Data being fetched when back online:
<img width="250x250" alt="app online, data being fetched" src="https://user-images.githubusercontent.com/84414488/138577157-4624a364-cc88-47f9-893b-de03efd004d1.png">


## License

  This project is covered by the license of: [MIT](https://opensource.org/licenses/MIT)

## Questions
  If you have any questions or would like to discuss this application further, please reach out to me via email at [here](mailto:j.iqal35@gmail.com) or visit my github profile at [janetiqal](http://www.github.com/janetiqal).
