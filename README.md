# Amazon ASIN Scraper

![GitHub package.json version](https://img.shields.io/github/package-json/v/nullgato/amazon-asin-scraper)
[![License](https://img.shields.io/badge/License-MIT-blue)](#license)

This project allows you to input a book's ASIN from Amazon and retrieve the book's metadata by scraping the html page that's returned from their server. I went with the scraping route because Amazon's API doesn't seem adquate to get all potentially relevant information about a book.

It also converts some text classes into their proper html element such as `.a-text-bold` into `<b></b>`. This is so you can keep the formatting while removing classes that aren't useful since you don't have the stylesheet for it anyway. It then strips the remaining classes so you're left with barebones (and not pretty) html.

For now this is just a node terminal application and you will input the ASIN via terminal and retrieve the metadata via terminal. Future improvements would be giving a few options for how a user will get their requested data. For example: the terminal, a file output, and an embeded webserver that runs a web-UI for easier data input and copying.

## Installation

### Requirements

-   Node.js (LTS or higher)

### Setup

-   Clone this project or download the .zip from the same place
-   Open a terminal window and point it to the amazon-asin-scraper folder
    -   `cd <filepath to folder>`
-   Run `npm install`
-   To start the application run `npm run dev`

### Usage

This project uses [TypeScript (TS)](https://www.typescriptlang.org/) which is a superset of JavaScript (JS). These days modern JS is fairly similar to TS making it incredibly easy to get started with. This project includes a transpiler that will process the `.ts` and `.tsx` files located in the `src` directory into JS.

To build the project, run `npm run build` in the terminal. This will transpile the `.ts` files into `dist` folder where you'll see `index.js` which is the entry point of the application. You can then run the application with `node dist/index.js` or combine both the build and run commands with `npm run dev`.
