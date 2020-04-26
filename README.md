# ContactInfo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.3.
The project include JSON Server 

## Development server

Run `npm install` then 
Run `npm run start-dev-mock` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change   any of the source files.

## Check JSON SERVER 

Run `npm install -global json-server`. Add  db.json in the project directory and add data in it . 

```
{
  "people": [
    {
      "firstName": "Test",
      "lastName": "Test",
      "phoneNumber": "(123) 456-7889",
      "emailAddress": "Test@gmail.com",
      "status": false,
      "id": 1.1850652130876773
    }
  ]
}
```

Run `json-server --watch src/db.json` 
> For GET Request `http://localhost:3000/people/1`

> For POST Request `http://localhost:3000/people` and send parameters in the request body

> For PUT Request `http://localhost:3000/people/1` and send parameters in the request body (Update)

> For DELETE Request `http://localhost:3000/people/1` and send parameters in the request body (delete)



## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

