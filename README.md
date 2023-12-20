# Online Judge HLD

## Project Description

The aim of this project is to build an Online Judge that remotely runs code securely and judges if the given code is correct, wrong, or inefficient.

### Functional Requirements

1. **Authentication and authorization of users**
2. **Search Problems based on problem name**
3. **Submit code and receive verdict**
4. **Save the solution of the user**

### Database Structure

#### USERS TABLE:

| FIELD NAME     | DATATYPE          |
| -------------- | ----------------- |
| User ID        | String (Primary Key) |
| Email          | String            |
| Password       | String            |
| Refresh Token  | Array Of Strings  |

#### PROBLEMS TABLE:

| FIELD NAME     | DATATYPE          |
| -------------- | ----------------- |
| Problem ID     | String (Primary Key) |
| Title          | String            |
| Difficulty     | String            |
| Solution       | String            |
| Description    | Object            |
| Testcases      | Array of Strings  |

#### USER SOLUTIONS TABLE:

| FIELD NAME     | DATATYPE          |
| -------------- | ----------------- |
| Problem ID     | String (Foreign Key) |
| User ID        | String (Foreign Key) |
| Solution       | String            |

### Backend

#### LIST OF PROBLEMS:

- **Template:** A list consisting of a list of problems linking it to the individual problem page.
- **View:** GET request to fetch all problems from the problem table and return to UI.

#### INDIVIDUAL PROBLEM:

- **Template:** Show the problem description, including the statement, input/output format, constraints, etc., along with the code editor and submission box.
- **View:** GET request to fetch problem details of a particular problem from the problem table and return to UI.

#### CODE SUBMISSION:

- **Template:** A submit button.
- **View:**
  - POST request to backend to handle execute.
  - Get the testcases for the problem from problem details.
  - For each testcase execute the submitted code in a local compiler.
  - Compare the output from the compiler result to the output of the testcase in the database.
  - Display the verdict on the screen.

### Frontend

Number of UI screens = 2

- **Header:** Contains title and signup/login button.
- **Problem List Screen:** Contains a table containing a list of problems and a search bar.
- **Individual Problem Screen:** Screen divided into two halves.
  - Left half contains the problem statement and description.
  - Right half contains the code editor, input/output, run and submit button.

### [Vedio link](https://drive.google.com/file/d/1AmZXIAYXAzHmPcRLXGDYA5_J9bUDpdaa/view?usp=sharing)
