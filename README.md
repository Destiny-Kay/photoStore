# A simple photo storing application

## Getting started
- Using docker(recommended)
    - **pre-requisite**: Ensure docker and docker compose is installed
    - copy content from **.env.example** to your local .env file in each of the two folders {frontend and backend}, *Each folder has their own .env file* and replace the variables or use as it is
    - Run `docker compose up -d`
- From source (*using linux based OS here*)
    - Clone the repo `git clone https://github.com/destiny-kay/photoStore.git`
    - **Backend**
        - **pre-requisite**: Ensure python is installed
        - cd into the backend directory `cd backend/`
        - create and activate a virtual environment `python3 -m venv .venv && source .venv/bin/activate`
        - Install dependencies `pip install -r requirements.txt`
        - Create a database with a user and grant all priviledges to this user.
        - create a .env file and copy all content from .env.example and replace all variables with your own
        - Apply migrations and run the backend `cd backend/ && python3 manage.py migrate && python3 manage.py runserver`
    - **Frontend**
        - cd into the frontend repository
        - **pre-requisite**: yarn, node installed
        - Install dependencies and run the application `yarn && yarn dev`
