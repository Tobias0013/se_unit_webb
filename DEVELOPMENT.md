# Development Guide

## Project Folder Structure

The project is organized into the following main directories:

```
├── client/
│   ├── component/
│   ├── controller/
│   ├── page/
│   ├── index.tsx
│   ├── index.html
|   └── style.css
├── tests/
|   └── ...
├── util/
|
├── package.json
├── README.md
├── DEVELOPMENT.md
├── .gitignore
├── package-lock.json
├── .babelrc
├── tsconfig.json
└── webpack.config.js
```

- **client/**: Contains the client-side code of the application.
    - **component/**: Reusable UI components.
    - **controller/**: Controllers for handling API/network interactions.
    - **page/**: Page components representing different pages.
    - **index.tsx**: Entry point of the client application.
    - **index.html**: Main HTML file.
    - **style.css**: Main global styles for the application.
- **tests/**: Contains unit and integration tests.
    - **...**: Placeholder for test files and directories.
- **util/**: Utility functions and helpers.
- **package.json**: Project metadata and dependencies.
- **README.md**: Overview of the project.
- **DEVELOPMENT.md**: Development guide for the project.
- **.gitignore**: Git ignore file.
- **package-lock.json**: Lockfile for npm dependencies.
- **.babelrc**: Babel configuration file.
- **tsconfig.json**: TypeScript configuration file.
- **webpack.config.js**: Webpack configuration file.

## Code Quality

To ensure high code quality, the following practices are followed:

### Code Style
- Use 2 spaces for indentation to maintain consistency across the codebase.

### Documentation
- Require JSDoc docstrings for all functions and classes to ensure proper documentation.