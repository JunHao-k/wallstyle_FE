# Wall Style

Access live demo site [here](https://wall-style.netlify.app/)

![Screenshots of Wall Style's homepage](./src/images/wall-style_mockup.jpg)

Test Accounts:
1. Admin Panel at https://wall-style.herokuapp.com/accounts/login
 - Owner account (Able to access everything)
    - email: owner@hotmail.com
    - password: password123

 - Admin account (Able to see look at products and variants page, unable to do CRUD)
    - email: admin@hotmail.com
    - password: password123

2. Customer at https://wall-style.netlify.app/login
 - email: customer@test.com
 - password: password123

## Background

For most of us, our homes serves as a sanctuary that we can retreat to after a day of work and activities. Therefore, many people will spend time and money to decorate their homes in a way that is pleasing to their eyes and help them to switch to a more relaxed mode. Interior design comes into play and an inexpensive and efficient method to quickly brighten up dull walls are hanging art canvases as opposed to having to mix and match colours to repaint walls

## Project Overview

This E-commerce project will aim to supply home-owners that wants to change the general outlook of the walls in their houses with the right art. These art will be in the form of a canvas where home-owners can choose which frames and dimensions their wall art comes in. It will allow them to take ownership of their walls design rather than depend excessively on interior designers

---

## The Five Planes of UI/UX

### Strategy

#### Organization's Goals
To act as a bridge between homeowners and their preferred ideal designs for the walls back in their homes

#### Users' Goals
As there is a high home ownership in Singapore, combined with the spread of this new trend via social media,families may look for creative ways to spruce up their home walls using their preferred pieces of art. 

1. **Organisation**
   - Objective: To have an eCommerce ready for interested home owners looking for art canvases to decorate their walls

2. **Users: Homeowners**
   - Objective: To look for their preferred art canvases to spruce up their house walls
   - Needs:
      - Able to search for art that are related to a theme
      - Able to search for art that are able to be complemented with other art to form a set
   - Demographics and Characteristics:
       - New homeowners
       - Homeowners that wants to design their own walls instead of depending on an interior designer
   - Pain point:
       - Not a lot of eCommerce to choose from for art pieces


User Stories | Acceptance Criteria(s)
------------ | -------------
As a homeowner, I would like to buy art pieces of a certain theme that I can use to decorate walls | Art canvases need to be labelled as under one or more themes
As a homeowner, I would like to be able to buy a set of a matching art canvases | Art that is able to come in a set should be labelled to show if it is part of a set and each model in the set be shown individually before putting them together to see how a set will look like.
As a homeowner, I would like to be able to save as much as I can on interior design after spending a ton of money on renovations or getting the house itself | Art canvases will also be categorised between those that have discounts and those that do not have any discount


### Scope

### Database
![Entity Relationship Diagram](./src/images/ERD_diagram.png)

ERD is drawn up to demonstrate the different relationship between enitities for the site before proceeding to model the database (SQL).

![Logical Schema](./src/images/Logical_Schema.jpg)

Logical Schema is drawn up based on the ERD diagram to show the relationship between tables and also the number of columns with its type defined.

A backend server will thus be necessary in order to allow communication between the site and database. Therefore,an Express server have been set up and deployed to [Heroku](https://www.heroku.com/). API endpoints are accessible via the base at https://wall-style.herokuapp.com/api.

#### Content
As this is an eCommerce platform, shop owner will have to provide the content and products. Products, customers and orders will need to be managed. Express servers also serves as an admin panel for management of data, and it will be accessed after registering at https://wall-style.herokuapp.com/accounts/signup. Only the owner can register an account for admin users.

