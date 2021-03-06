# A11yChecklist

This is a tool to help generate a custom list of automated and manual accessibility tests based on the type of content being tested.

It will produce a filtered list of <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2.1 guidelines that explain what to test, and where possible, give some JavaScript snippets that can be run in a browsers developer console to check for things in a more automated way.

As always with any kind of automated check such as this, it is not a replacement for manual testing, and a passing automated test is only an indication that you're doing things right, not a guarantee that you actually are. Always try to test with different browsers, input devices, screen readers, physical devices, and with people of differing needs where you can.

There is an online version of this already built and ready to use at https://www.ashleysheridan.co.uk/a11y-checklist

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Stylesheets are not embedded into each component. Instead, a single stylesheet is built using [SASS](https://sass-lang.com). From with the project root, run the following during development:

```sh
 sass --watch src/assets/scss/app.scss:src/assets/css/app.css
```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the following for a production build:

```sh
ng build --prod --aot --output-hashing none
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
