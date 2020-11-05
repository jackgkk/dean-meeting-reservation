# Stage 3
#ARG ENTRYPOINT="bin/bash"
FROM openjdk:15-jdk-oraclelinux8 as build
WORKDIR /workspace/app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

ENTRYPOINT ["/bin/bash"]

#will download libs
#RUN ./mvnw install -DskipTests

# Stage 4
#FROM openjdk:15-jdk-alpine
#VOLUME /tmp
#COPY --from=build /workspace/app/target/*.jar app.jar
#EXPOSE 5000
#ENTRYPOINT ["java","-jar","/app.jar","--server.port=5000"]