# Asp.net core + CRA react app

## Requirements

* .NET 6.0 SDK
* Node.js

## Starting server

To start front + back use Visual Studio or command

```cmd
dotnet run
```

to start only front end use

```cmd
cd ClientApp/
npm start
```

## !!! Required files to run ClientApp

1. (Important) setupProxy.js (with "http-proxy-middleware" dependency)
1. aspnetcore-https.js
1. aspnetcore-react.js
1. .env & .env.development

Those three are used to set up proxy bridge between react and backend api
