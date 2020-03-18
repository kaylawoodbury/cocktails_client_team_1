# The Midcourse Project | Team 1
### Authors
[Hunter Vitous](https://github.com/hmvitous)
[Kayla Woodbury](https://github.com/kaylawoodbury) 
[Daniel Bryant](https://github.com/DanielGITB)
[Janko Radakovic](https://github.com/MadFarmer101)
[Carlos Delgado](https://github.com/Carltesio)
[Paulo Swärdblad?](https://github.com/pauloswardblad) 
 

### Workflow Guidelines
 - PR Review: at the end of each day we will meet to review any PRs as a group that are ready for Thomas to review

 - Carousel of swtching: As we stitch partners and front/back, one person will stay while the other three shift and then they will shift next round that way there is always one person comfortable with what next step is needed with the front or back but we still will all eventually switch and work with every part with everyone in the group.

 - 20 min to research blocker, 10-15 with whole group, then pull in Thomas, do not be stuck on a blocker for more than an HOUR!!!

- When starting a new feature, take the time to make sure we are on the right branch, pull upstream to main branch, etc

- Ping group each time we push/pull and start new features

- Post morning scrum meeting, 5-10 min to make sure eveyone is clear on path for the day and to assign feature for the day

- Post lunch 5-10 min scrum

- Morning/Evening show and tell: where each coding group briefly walks through the code they added the previous/current day so that everyone know what all the code is doing and where to find each component.

- Ping group if uncertain about naming to help make sure front and back correlate


## Built with
**Front End:** React v. | CSS  
**Back End:** Ruby 2.5.1 | Rails 6.0.2 
**Testing framework:** Cypress  
**Deployed at:** [Netlify](https://tippler-team1.netlify.com/) and [Heroku](https://cocktails-api-team1.herokuapp.com).

## The code   
This project allows the user to look up cocktails by name or partial name and see a list of results that the user can then select from to see additional details. The drink details include an image, glass type, ingredients and instructions. Next to the ingredients, the user has the option to see the options System Bolaget has for the required alcohol. This application uses a Rails [backend]() which links to two different third party APIs for the [cocktail]() information and the [System Bolaget](). 

## Getting started
### Dependencies  
* Yarn
* React
* Cypress
* Axios
* Semantic UI

### Setup   
To test this application, fork the repo to your own GitHub account and clone it to your local workspace. </br>
*Note:*Be sure to set up backend api first (noted above), in order to fully interact with the application. 
Install all of the dependencies:    
```
$ yarn install
```  
Start cypress and run the feature tests:  
```
$ yarn run cy:open
```
Start the backend api (if already configured) in a separate terminal (only run this command for the Rails application):
```
$ rails s
```
Start the React application and run it on your local host:
```
$ yarn start
```

## Updates/Improvements   
- Remove the 'Show the Booze' buttons from the non-alcoholic ingredients
- More styling
- Add log in functionality
- Add ability for use to save a drink to a personal list
- Add geolocation to only show the booze options at the System Bolaget closest to the user

## License  
[MIT-license](https://en.wikipedia.org/wiki/MIT_License)

### Acknowledgement  
- Material provided by [Craft Academy](https://craftacademy.se)
- Thomas Ochman for guidance and demos
