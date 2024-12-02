# MuteniProject

This Angular project implements a multi-step form for completing a declaration of honor for a legal representative. The form guides users through several steps to input and validate their information, culminating in a summary and confirmation step.

## Technical Stack

- Frontend: Angular ReactiveForms , MaterializeCss
- Language: TypeScript
- Translations: ngx-translate
- Address Search Autocomplete : Nominatim OpenStreetMap API (OSP)
- Countries Search : Rest Countries Api
- JSON Server : Backend Mock Interactions 

## Versions Stack
### Angular CLI: 18.2.11

- Node: 20.18.0
- Package Manager: npm 10.8.2
- OS: win32 x64

## Run Project

### Locally

To run the project locally, execute these commands:

```bash
cd muteni-project
npm install
ng serve --open
json-server --watch db.json --port 3101
```

### with docker-compose

```bash
cd muteni-project
docker-compose up --build
```

This command will:
- Build the Docker image for muteni-bank project.
- Start the container.
- The application will be available at http://localhost:8080 in your browser and at http://localhost:3101/certificates to view the submitted form.

## Features

- Implement multi-step forms using Reactive Forms.
- Style the application with MaterializeCSS for a modern UI/UX.
- Manage parent-child communication between components effectively.
- Validate the form inputs with dynamic and robust validation rules.
- Implement address and country autocomplete features using external APIs.
- Simulate backend POST requests and interactions by integrating JSON Server.

## Project ScreenShot

### Form Introduction
![Screenshot](https://github.com/anisboulila/muteni-project/blob/develop/src/assets/screenshots/1.png)

### Modal Accept Conditions
![Screenshot](https://github.com/anisboulila/muteni-project/blob/develop/src/assets/screenshots/2.png)

### Step 1 : Legal representative information
![Screenshot](https://github.com/anisboulila/muteni-project/blob/develop/src/assets/screenshots/3.png)

### Step 2 : The deceased Information
![Screenshot](https://github.com/anisboulila/muteni-project/blob/develop/src/assets/screenshots/4.png)

### Step 3 : Beneficiary information
![Screenshot](https://github.com/anisboulila/muteni-project/blob/develop/src/assets/screenshots/5.png)

### Summary All Steps
![Screenshot](https://github.com/anisboulila/muteni-project/blob/develop/src/assets/screenshots/6.png)

### Confirmation Form Submit
![Screenshot](https://github.com/anisboulila/muteni-project/blob/develop/src/assets/screenshots/7.png)

### Server Backend Mock 
![Screenshot](https://github.com/anisboulila/muteni-project/blob/develop/src/assets/screenshots/8.png)


