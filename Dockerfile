FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /workspace

COPY Back-end/.mvn .mvn
COPY Back-end/mvnw Back-end/pom.xml ./
RUN sed -i 's/\r$//' mvnw && chmod +x mvnw && ./mvnw -B dependency:go-offline

COPY Back-end/src ./src
RUN ./mvnw -B clean package -DskipTests

FROM eclipse-temurin:21-jre-jammy AS runtime
WORKDIR /app

COPY --from=build /workspace/target/*.jar app.jar
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
