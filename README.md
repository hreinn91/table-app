# table-app

## Description

Simple table app with a react frontend and spring boot backend.

### Requirement

docker version ge 23.0.1

### How to start

	docker-compose up --build


The application will be served on the out port for the table-ui image which is port 4000

Navigate to `http://localhost:4000`


#### Rebuild one service

    docker-compose up -d --no-deps --build <service_name>

#### Only Backend

    mvn clean install    
    java -jar -Dspring.profiles.active=dev target/table-backend-0.0.1-SNAPSHOT.jar


#### Only frontend

    npm start


#### Access the database

Note that we are using postgres image and the name of the database is `tabledb`

    docker exec -it <pg-container-id> sh
    psql
    \c tabledb


