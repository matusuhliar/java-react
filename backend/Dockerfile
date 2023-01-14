FROM gradle:jdk17 as gradleimage
COPY . /home/gradle/source
WORKDIR /home/gradle/source/
RUN gradle clean build

FROM openjdk:17
COPY --from=gradleimage /home/gradle/source/build/libs/sample-app-1.0.0.jar /app/
WORKDIR /app
ENTRYPOINT ["java", "-jar", "sample-app-1.0.0.jar"]