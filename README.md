# Education Workshop Final

Welcome to the FullStack!! This is a simple contacts application which demos a backend server, database DAO, and modern frontend.

If deploying online, please do not store any sensitive data in this application as we're keeping things simple for now.

## Running the server

Below are some details that are useful for running the server in production / devlopment mode.

### Backend

The backend .example.env file details an required `DB_URL` environment varaiable which should be the contact information for your database.

For mongodb, we are currently embedding authentication information in `DB_URL` please consider the entire variable as sensitive.

> [!IMPORTANT]
> You need to restart the backend server after changing `DB_URL`

### Frontend

The frontend has an important `VITE_API_BASE_URL` variable which is the URL that specifies the location of your backend server and the endpoint `/api` where the api is located.

This will be `/api` if the server is located on the same location as the frontend or `https://somethingelse.com/api` if the backend server is on a different domain.

> [!IMPORTANT]
> You need to REBUILD the frontend files after changing `VITE_API_BASE_URL` as this is embedded in the final output javascript files.

![image](https://github.com/UoaWDCC/education-workshop-final/assets/12622625/5c02325f-a112-4866-a560-ec1c6295a146)
