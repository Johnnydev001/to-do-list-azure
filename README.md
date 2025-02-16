# To-do list application

## Description
This application was built in order to develop new skills, as a full-stack developer, by going through the different technical areas required for creating an app: UI design, frontend development, backend development, CI/CD and QA.

I idealized it to be the simplest possible so I would have the freedom and ease to create the architecture, decide which technologies to use, and learn along the way.
Consisting of a to-do list application, the user can perform simple actions like registering, sorting, and searching items.

## Technologies:

In this section, the whole stack of used technologies is presented.

**Note:** Several Azure Cloud resources were used in the middle of the development phase, however, they are no longer being used, due to the associated costs of the Azure resources.

**Frontend:**
* React
* Typescript
* Tailwind CSS

**Backend:**
* Springboot Kotlin

**Database:**
* MongoDB

**CI/CD:**
* Docker
* Kubernetes
* Azure Pipelines

**Azure resources:**
* Azure Web APP
* Azure CosmosDB
* Azure Container Registry
* Azure Keyvault
* Azure Virtual Network

**Testing**
* Unit tests with Jest
* E2E tests with Playwright
* API testing with Insomnia


## Execution
To execute the application, there are a couple of things to consider:
- Create and update both frontend and backend .env files with the secrets according to the ones in  the .env.example files

Run frontend and backend as standalone applications:

- **Frontend**
````
cd frontend
npm I
npm run dev
````

- **Backend**

````
cd backend
./gradlew bootrun
````
- **Frontend tests**

````
cd frontend
npm run unit-test
npm run e2e-test
````

Run the frontend and backend containers with Docker Compose in the root folder (**Note: Requires a Docker installation up and running**):

````
docker compose -f compose.yml up
````

After successful execution, the application should display the following content:

![screenshot](https://github.com/user-attachments/assets/213497e5-1e5c-43df-9b17-4c7212c65a71)



