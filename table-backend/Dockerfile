FROM maven:3.9-eclipse-temurin-19-alpine AS build

WORKDIR /app

# Copy the pom.xml and any other necessary configuration files
COPY ./pom.xml /app
COPY ./src /app/src

# Build the application
RUN mvn clean package -DskipTests

FROM openjdk:19-jdk-alpine

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar","-d64","-Xms8G","-Xmx10G"]