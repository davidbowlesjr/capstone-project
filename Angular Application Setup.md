# Angular Application Setup

## Angular CLI

```
npm install -g @angular/cli
```

## **Create a new angular application**

```
ng new <app_name>
```

## Spin up the Angular Server

```
ng serve
```

## **How to create a component**

- Create the following files (better to be in a folder dedicated for the component)
    - [**componentName**].component.ts"
        - contains the component class
            - data to be displayed (state)
            - UI event logic
    - [**componentName**].component.html
        - contains the HTML template that need to be displayed with the component is rendered
    - [**componentName**].component.css
        - contain the styles for the HTML template
- Register the component in the module (in the "declarations" section)

# AngIntro

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io/).
