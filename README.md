#  Tic Tac Toe Game

## Introduction

This is a fun and engaging titactoe game built with React Native . Customize your game settings, Customize the gameSettings and enjoy a smooth performance with clean and user-friendly interface.

## Installation

### Prerequisites

Ensure you have the following installed:

- npm
- expo CLI
- React Native CLI

### Setup Steps

1. Clone the repository:

   
   git clone https://github.com/chackovrgh/TicTacToe.git
   cd TicTacToe
    

2. Install dependencies:
   
   npm install
   



## Folder structure

This template follows a very simple project structure:

- src: This folder is the main container of all the code inside your application.
- Components: This folder contains all reusable components used throughout the application.
- assets: This folder contains static assets such as images.
- Board.js: It handles the Tic-Tac-Toe board layout and logic.
- Square.js: It represents each square on the board.
- screens: This folder contains the different screens/views of the app.
- GameScreen.js: The main screen where the game is played.
- PlayerSelectionScreen.js: Screen where users select the players.
- SettingsScreen.js: Screen for customizing game settings.
- utils: This folder contains utility functions.
- calculateWinner.js: It determines the winner of the game.
- colorSelect.js: The utility for handling color selections.



Scripts:
   While specific commands are detailed in the package.json file, here are a few useful scripts and their purposes:

start:
 Starts the expo server.

npx expo start

android:
 Runs the development server and opens in an android emulator.

npx expo start --android

ios:
 Runs the development server and opens your app in an iOS simulator

npx expo start --ios

web:
 Runs the development server and opens your app in a web browser.

npx expo start --web

