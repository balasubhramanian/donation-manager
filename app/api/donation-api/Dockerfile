FROM openjdk:8-jdk-alpine
#VOLUME /tmp
ARG JAR_FILE=target/donation-api-0.0.1-SNAPSHOT.war
COPY ${JAR_FILE} app.jar
#CMD ["java","-Djava.security.egd=file:/dev/./urandom", "-Dspring.profiles.active=h2" ,  "-Dsms_api_url=http://example.com","-jar","/app.jar"]
CMD java -Dspring.profiles.active=h2 -Dsms_api_url=http://example.com -Xms256m -Xmx512m -jar /app.jar
