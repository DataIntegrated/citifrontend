# [Mobitill-Accounts](http://accounts.mobitill.com)

This is the mobitill accounts service, and is meant to provide authentication/authorisation services  

## Contributing
This project is built in [Go](http://golang.org), and UI is built with [Reactjs](https://facebook.github.io/react/)  

Make sure you have Go installed and your GOROOT and GOPATH environment variables are set properly.

**UI** files are in the `websrc` directory, you will need to run `npm install` inside this directory so as to get all the
npm development dependencies

**Webpack**  
run `npm watch` inside `websrc` to built and watch changes with webpack while working to the ui

### Code Formatting
Go code **MUST** be formatted using `go fmt`  
Js code **MUST** be formatted using [prettier](https://github.com/prettier/prettier)

clone the repo
```bash
$ git clone git@github.com:DataIntegrated/mobitill-accounts.git
```
