## What is what
Front-end UI to do a work demo.
Backend: No backend, only faked data fetched via http mocked flow.

### Flow
- Get a list from the Backend
- Display that list
- Ability to display extra details of one element of that list
- Routing to handle back actions

### How to run it?
Have Angular CLI installed: $ npm install -g @angular/cli
- See (the docs)[https://cli.angular.io/]
$ npm install
Run `ng serve --open` Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Testing
I am starting to understand how angular2 work, so Test will be next step.

### Notes:
- Some "content.resource.standards.standard" are sometime Object sometime Array. A middleware was added to correct the API data, but the API data should be consistent.
- In my opinion the Details should be Under the list as a collapsable OR in a second page with the router, but the requirement was a SPA.
- The API should also dump specific data for the view not do a global DB dump with not used data.
- Having the ID on the router allow the Ability to share the view with a friend. ;)

#### Fun fact:
Piping like "orderBy" is not out of the box with Angular2.

### TODO:
- Flow question: Move the Fetch to API to a higher level and play with the sub data? or always refresh the call to have the latest data?
- Improvement: The API data to be more useful should send JSON with true and number as number instead of string format -> Can cause edge cases later if the API change.
