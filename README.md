# MyReadsProject

This project is for the Udacity React course. The starter repository can be found [here](https://github.com/udacity/reactnd-project-myreads-starter). To run the app, clone the repo, navigate to directory, then run ```npm install```. Once finished, enter ```npm start```. Next, navigate to localhost:3000 on a web browser.

## Application Overview
The app allows the user to keep track of books to read. The app has three different "bookshelves" that contain instances of books. The shelves are:

* Currently Reading
* Want to Read
* Read

Every book can be moved to each of the different shelves. To do so, click on the green button with the white arrow, then select the desired shelf. Selecting 'None' will remove the book from the homepage, but the book will still be available when searching. 

To search, click on the button in the bottom right hand corner with the '+' sign. Doing so will navigate the user to the '/search' page, where the user can enter queries. This app only matches certain queries, and these can be found in the SEARCH_TERMS.md file. As the query changes, the found books will change as well. All books that are not already on one of the three shelves will be shown to have a value as 'None' under their dropdown. To move a found book to a shelf, simply select the desired shelf. 

To exit the search page, click on the arrow in the top left corner, or click the back button on the browser. The home page will display newly moved books on the desired shelves.
