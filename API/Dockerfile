FROM eclipse-temurin:17-jdk-jammy
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN /usr/pkg/bin/mvn dependency:resolve
COPY src ./src
CMD ["./mvnw", "spring-boot:run"]
