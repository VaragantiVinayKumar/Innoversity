FROM openjdk:11

EXPOSE 8090

ADD ./target/authentication-service-0.0.1-SNAPSHOT.jar authentication-service-0.0.1-SNAPSHOT.jar

ENTRYPOINT ["java","-jar","/authentication-service-0.0.1-SNAPSHOT.jar"]