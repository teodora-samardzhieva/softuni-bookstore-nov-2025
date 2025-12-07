## ReactJS Bookstore Project Assignment

A SPA built with **React.js** on the frontend and the **SoftUni Practice Server** *(non-persistent)* for the backend.
This project showcases my abilities in **CRUD operations**, **user authentication**, **route protection**, the **React Context API**, and **custom React hooks**.
It was created to further develop my React skills and explore building a full-featured single-page application.

## Application Structure

├── client/ # React frontend 

├── server/ # SoftUni Practice Server backend

- The application have:

• Public Part (Accessible without authentication)

• Private Part (Available for Registered Users)

## How to run
- clone the repo

---

- Server: 
    - cd ./server (go to server dir)
    - node server.js (execute the command in terminal)
---
- Client:

    - cd client
    - npm install

    ---
    
    - npm run dev (this runs the project for development mode)

## ⚠ NOTE

The **SoftUni Practice Server** is **non-persistent** — all data will reset when the server restarts.  
This is intentional for learning purposes.

## Public Part / Guest users can:

- access Home page;

- access Catalog page(check Book Catalog);
    - Search in Catalog:
        - by book name; 
        - by book author;
        
    - Filter/sort books:
        - A-Z;
        - Z-A;
        - Newest;
        - Oldest;
    
    - Check Book details by clicking on the details button(from Home page, latest books or Catalog)
    - Read Comments and Reviews left by other users and sort them by Newest/Oldest
    
    - Use Manual Pagination at the bottom of Catalog page;

- access About-us page;
    - can see store location and their location(if allowed)

- access Login page;
- access Register page;


## Private Part / Authenticated users can:
- users:

    - email: "tedi@abv.bg"; password: 123456
    - email: "vasil21@abv.bg"; password: 123456
    - email: "peter@abv.bg" ; password: 123456
    - email: "george@abv.bg"; password: 123456

You can register a new one if you want to! :)

- access Home page;

- access Catalog page(check Book Catalog);
    - Search in Catalog:
        - by book name; 
        - by book author;
        
    - Filter/sort books:
        - A-Z;
        - Z-A;
        - Newest;
        - Oldest;
    
    - Check Book details by clicking on the details button(from Home page, latest books or Catalog)
    
    - Use Manual Pagination at the bottom of Catalog page;

- access About-us page;
    - can see store location and their location(if allowed)

- access Favorites page:
    - Add/remove book to/from wishlist collection(book is accesable from Catalog and appear in Favorites after adding to collection)

- CRUD for Authenticated user:

    - Create book (from Add Book in Navigation)
    - Write/read comments for books from Details(button for book details)
    - Write/read reviews for books from Details(button for book details)
    - Edit/Delete books if is author from Details(button for book details)
    - Delete comments if is author from Details(button for book details)

- Other functionality

    - Bookmark/Unbookmark book from Bookmark(button for book details)(which navigate to Favorites)
    - Sort comment/reviews by Newest/Oldest
    - Check latest books in Home page;
    - Logout user (from Logout in Navigation)


# Project defense requirements:
## Public Part
    - Home Page
    - Login
    - Register
    - Catalog
    - About-us
    - Check latest books from Home page without functinality
    - Check books collection and book details without functionality
    - Check comments and reviews about specific books(and sort them) without functionality

## Private Part
    - Home Page
    - Favorites
    - Catalog
    - About-us
    - Add Book
    - Logout

## General requirements
- At least 3 dynamic pages:

    - Home Page
    - Catalog
    - Favorites
    - Add Book
    - Book details


- Must have specific views:

    - Catalog(list of all created books)
    - Home page(latest 3 books)


- Information about a specific record(book)

    - Book details

- At least one collection, different from the User collection, with all CRUD operations

    - Books collection can Create, Read, Update, Delete
    - Comments collection can Create, Read, Delete
    - Reviews collection can Create, Read
    - Favorites collection can Create, Read, Delete

## Logged in users
    - can bookmark/unbookmark books to/from Favorites
    - can comment (book details page)
    - can rate(leave a review) books (book details page)
    - can create books

## Logged in users(if Author)
    - can edit and delete books
    - can delete comments

## Guest users
    - Access to basic website information without functionality

# Use React.js for client-side

## Communicate to a remote service via REST
    - softuni practice server

## Implement authentication
    - Login/Register user (create session on the server)
    - Logout user (delete session from the server)
    - Implement client-side routing to at least 5 pages( at least 2 with parameters)
    
### Routing
    - /, /login, /register, /logout, /books /about-us, /create, /favorites

### Routing with parameters
/books/:bookId/details, /books/:bookId/edit

- Meaningful commits on small steps at GitHub control system


# Other requirements
## Error handling
<!-- demonstrating manual abort controller in case to prevent multiply requests(in useQuery abort controller happening under the hood) -->
    - showing error message
    - data validation before send data to the server
    - The application should be divided into components
    - Divided on components to make code readable and reusable
    - Dumb components to reuse them in different parts of the app
    - Smart components to make architecture more easy for development
    - Use good folder structure to avoid techincal debt when the project is growing

## Demonstrate use of the following programming concepts, specific to the React library

### React Hooks

    - useRef, useState, useParams, useContext, useEffect, useNavigate

### Custom Hooks

    - useForm, usePersistedState, useRequest

### Context API

    - useContext
    - context

Stateless and stateful components

### Bound Forms

    - demonstrating bound forms(controllerd forms)
    - demonstrating form action state as well

### Synthetic events

    - demonstrating synthetic events instead of DOM events to make sure React app is consistent and fast

### Component lifecycle (mount, update, unmount)

    - Unmounting components with clean up function and abort evenets if neccessary

### Route Guards for Private and Public users

### Good usabillity. GOOD UI and UX
    - custom design
    - using best practices
    - responsive on different devices

## Bonus Feature

- Implement cloud file storage using Firebase(to store photos)
<!-- - Unit tests and component tests using vitest -->
<!-- Deployed app at ..... -->

## Bonuses not described in the assignment but has practical use:

- Search bar in Catalog for better UX
- Manual Pagination to load data at small parts in Catalog
- Responsive design for mobiles and desktop