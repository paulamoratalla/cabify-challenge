# Description 

Backend challenge to access to a Cabify Bootcamp (succesfully) ✅. We are asked to develop a service that provides groups of seven or less people, assign them to a specific restaurant and have one different leader each time. 🌮 Link to the GitHub of the challenge: https://github.com/TeoDiaz/backend-bootcamp-challenge/blob/master/challenge.md

## Endpoint routes

| Method | URL | Description |
|-------------|-------------|-------------|
| POST | /eaters | Creating new eaters in the system |
| GET | /eaters | List of all the eaters |
| DELETE | /eaters | Remove all the eaters and restaurants registered |
| POST | /restaurants | Creating new restaurants |
| GET | /restaurants | List of all the restaurants |
| PUT | /restaurants/:id | Edit restaurant data |
| DELETE | /restaurants/:id | Delete especific restaurant |
| POST | /create_groups | Creating the different groups |
| GET | /groups | Return all the groups created |

| .env  | 
| PORT  | 
| MONDODB_URI  | 