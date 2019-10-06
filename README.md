## 90s Sitcoms

### Installation and Setup
From the command line:
1. `git clone https://github.com/djavanm/90s-sitcoms-api <PROJECT_NAME>`
1. Run `npm install`
1. Run `nodemon server.js`

In your browser:
Open localhost://3000/

### Overview
The 90s sitcoms API is a database containing information on popular television sitcoms during the 1990's and early 2000's. Users can gain access to information about sitcoms, and their cast members. Information can be added or updated by accessing each endpoint with the required information, if necessary.

### Technologies
- JavaScript / Node.js 
- Express.js 
- PostgreSQL 
- Knex.js 

### Endpoints

| url | verb | options | expected response |
| ----|------|---------|---------------- |
| `https://sitcoms-api.herokuapp.com/api/v1/sitcoms` | GET | not needed | ARRAY of all sitcoms currently in the database |
| `https://sitcoms-api.herokuapp.com/api/v1/castMembers` | GET | not needed | ARRAY of all cast members currently in the database |
| `https://sitcoms-api.herokuapp.com/api/v1/sitcoms/:id` | GET | not needed | OBJECT containing SITCOM key detailing current sitcom, and CAST key containing an ARRAY of castMembers.|
| `https://sitcoms-api.herokuapp.com/api/v1/castMembers/:id` | GET | not needed | OBJECT of the specified castMember |
| `https://sitcoms-api.herokuapp.com/api/v1/sitcoms/` | POST | `{"title": <STRING>, "seasons": INTEGER, "episodes": <INTEGER>, "premiere_date": <STRING ex. "01-01-1990>, "finale_date": <STRING ex. "01-01-1990> }` | Add a new sitcom to the shipyard database, success response contains sitcom ID `` |
| `https://sitcoms-api.herokuapp.com/api/v1/castMembers` | POST | `{"name": <STRING>, "character": <STRING>}, "original": <BOOLEAN>, "sitcom_id": <INTEGER> ` | Add new castMember; success response contains castMember ID |
| `https://sitcoms-api.herokuapp.com/api/v1/castMembers/:id` | DELETE | not needed | Delete selected cast member from the database |

Note: All of these endpoints will return semantic errors if something is wrong with the request.