# Software Engineering Unit (webb)

## Description

This project aims to create a interactive house web application that is a part of a larger project aimed at creating a smart home application where users can control and monitor their smart devices remotely. This application serves as the primary frontend for users to interact with their home devices. The frontend will provide real time control and feedback.

This project was made as a part of the course DA330A (Software Engineering 15 hp) at Kristiansand University.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)
- [Contact](#contact)

## Installation

To install and set up this project, follow these steps:

1. Clone the repository: `git clone https://github.com/Tobias0013/se_unit_webb.git`
2. Install the required dependencies: `npm install`
3. Configure the environment variables:
   - Create a new file named `.env` in the root directory of the project.
   - Open the `.env` file and add the following environment variables:
     ```
     //TODO: ADD ENVIROMENT VARIABLES
     API_URL=<url to backend>
     MOCK=<true/false> (mock api)
     ```
4. Then run the project with `npm start`

## Deploy

To use deplay this project, follow these steps:

1. Follow the [installation](#installation) guide.
2. Run the script `npm run build`
3. Start the server: `npm start-build`
4. Open your web browser and navigate to `http://localhost:"port-enterd-in-.env"`

## Development

### Scripts

The following scripts are available for development and deployment:

- `npm start`: This script starts the webpack development server for the client-side code in development mode and opens it in the default web browser.
- `npm run build`: This script builds the client-side code for production using webpack in production mode.
- `npm run start-build`: This script opens the built client in the default web browser at `http://localhost:3000`. //TODO: how to do this since we dont have server to deliver.
- `npm run remove`: This script removes the `node_modules` directory, which contains the installed dependencies.

### Make Commands

This project supports `make` commands for easier management of development and deployment tasks. You can use the following command to see all available `make` commands:

```sh
make help
```

## Credits

- [Tobias0013](https://github.com/Tobias0013)
- [Securella](https://github.com/Securella)
  //TODO: ADD ALL CONTRIBUTERS
