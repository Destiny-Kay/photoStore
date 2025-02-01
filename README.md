# A simple photo storing application

## Getting started
- Using docker(recommended)
    - **pre-requisite**: Ensure docker and docker compose is installed
    - copy content from **.env.example** to your local .env file and replace the variables or use as it is
    - Run `docker compose up -d`
- From source (*using linux based OS here*)
    - Clone the repo `git clone https://github.com/destiny-kay/photoStore.git`
    - **Backend**
        - **pre-requisite**: Ensure python, postgresql database is installed
        - cd into the backend directory `cd backend/`
        - create and activate a virtual environment `python3 -m venv .venv && source .venv/bin/activate`
        - Install dependencies `pip install -r requirements.txt`
        - Create a database with a user and grant all priviledges to this user.
        - create a .env file and copy all content from .env.example to it Replacing the database credentials with credentials used from previous step.
        - Apply migrations and run the backend `cd api/ && python3 manage.py migrate && python3 manage.py runserver`
    - **Frontend**
        - cd into the frontend repository
        - **pre-requisite**: yarn, node installed
        - Install dependencies and run the application `yarn && yarn run`
