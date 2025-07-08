
# Quick Task Manager

**Quick Task Manager** is a simple and efficient task management web app that allows users to add, manage, and track their tasks with ease. The application supports task filtering, a summary dashboard with visual stats (using Chart.js), and user-specific task tracking via backend API integration.

## 🌟 Features

* ✅ Add and manage tasks
* 📋 Filter tasks by **All**, **Pending**, or **Completed**
* 📊 Task summary dashboard with bar chart (Chart.js)
* 🔐 User-specific task loading based on `userId` stored in `localStorage`
* ⚡ Backend integration using REST API (Spring Boot)

## 🔧 Technologies Used

### Frontend

* HTML, CSS, JavaScript
* Chart.js for data visualization

### Backend

* Java Spring Boot REST API (running on `http://localhost:8080`)

### Others

* LocalStorage for storing userId

## 📁 Project Structure

```
quick-task-manager/
│
├── index.html          # Main task list page
├── summary.html        # Summary dashboard with chart
├── main.js             # Handles task logic and chart rendering
├── style.css           # UI styling
└── README.md           # Project documentation
```

---

## 🧪 Testing

- Backend tested using JUnit and Spring Boot Test
- Integration tests for API endpoints
- Validation on user inputs for both frontend and backend

---


### Backend (Spring Boot)
1. Clone the repository:
   ```bash
   git clone https://github.com/IT21826740/quick-task-manager.git
   cd quick-task-manager/backend

---

## 🛠️ Steps to Run the Project

1️⃣ **Start Docker and Database Connection**

* Make sure Docker is running.
* Start the database container (e.g., MySQL).

2️⃣ **Open the Project in IntelliJ IDEA**

* Import the project as a Maven project.

3️⃣ **Navigate to Project Path**

```bash
cd /path/to/your/project
```

4️⃣ **Start the Database Container**

```bash
docker exec -it <container_name> /bin/bash
mysql -u root -p
# Enter your password when prompted
```

5️⃣ **Run the Spring Boot Application**

```bash
mvn spring-boot:run
```

6️⃣ **Run Test Cases (if needed)**

* Find the `test` directory in your project structure.
* Run all test cases from IntelliJ or use Maven:

```bash
mvn test
```

7️⃣ **Generate Code Coverage Report**

```bash
mvn clean test
# Check the `target` directory. If `site` folder is missing, create it manually.
```

8️⃣ **Create JaCoCo Coverage Report**

```bash
mvn jacoco:report
```

9️⃣ **View Code Coverage**

* Open the following file in your browser:

```
target/site/jacoco/index.html
```

* You can also find the XML version:

```
target/site/jacoco/jacoco.xml
```

🔟 **Run Static Code Analysis with SonarQube**

* Start SonarQube locally using Docker:

```bash
docker run -d --name sonarqube -p 9000:9000 sonarqube:latest
```

* Visit: [http://localhost:9000](http://localhost:9000)
  Default login: `admin / admin`
  *(Change password in Security page)*

1️⃣1️⃣ **Run Sonar Analysis**

```bash
mvn sonar:sonar \
  -Dsonar.projectKey=quick-task-manager \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=<YOUR_SONARQUBE_TOKEN> \
  -Dsonar.coverage.jacoco.xmlReportPaths=target/site/jacoco/jacoco.xml
```

1️⃣2️⃣ **View Sonar Results**

* Go to: [http://localhost:9000](http://localhost:9000)
* View:

  * ✅ Code Coverage %
  * 🚨 Code Smells
  * 🐞 Bugs
  * 🔐 Vulnerabilities
  * 🔁 Duplications

1️⃣3️⃣ **Run the Frontend**

```bash
cd /path/to/your/project
google-chrome http://localhost:8080/login.html
```

1️⃣4️⃣ **Find Frontend Code**

* Navigate to:

```
src -> main -> resources -> static
```

---

## 📌 Screenshots

[Screencast From 2025-05-11 17-14-23.webm](https://github.com/user-attachments/assets/e06d6837-414b-4dd8-90fb-889e908217f6)

![jacoco-screenshot](https://github.com/user-attachments/assets/f1ce9ed1-1c48-436f-81dd-714dfeb1c898)

![sonarqube-screenshot](https://github.com/user-attachments/assets/d3c2b560-00c8-4609-9cd0-6942ce668e28)


## 📬 Feedback & Contributions

Feel free to fork the repo, raise issues, or submit pull requests.
Your feedback is always welcome!

---
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


### 🧠 **Mind Map: JUnit Testing in Java**

---

#### ✅ **1. What is Testing?**

* **Definition:** Process of verifying code behaves as expected.
* **Goal:** Catch bugs early, ensure correctness and reliability.
* **Types:**

  * Manual Testing
  * Automated Testing → *JUnit falls here*

---

#### 🔍 **2. Types of Testing**

**A. Unit Testing**

* Tests **individual methods or classes** in isolation.
* Fast and simple.
* Uses mocking (e.g., Mockito) to isolate dependencies.

**B. Integration Testing**

* Tests how **components interact** with each other.
* Often involves real database, web server, etc.
* Slower, but checks real-world behavior.

---

#### 🧪 **3. What is JUnit?**

* A **Java testing framework** used for writing and running tests.
* Provides:

  * Annotations like `@Test`, `@BeforeEach`, `@AfterEach`
  * Assertions like `assertEquals`, `assertTrue`
  * Support for parameterized tests, lifecycle management, etc.

---

#### ⚙️ **4. How to Use JUnit**

* Add dependency: (e.g., in Maven)

  ```xml
  <dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.10.0</version>
    <scope>test</scope>
  </dependency>
  ```

* Basic structure:

  ```java
  @Test
  void testMethod() {
      assertEquals(expected, actual);
  }
  ```

* Integration: Use with Spring Boot via `@SpringBootTest`.

---

#### 🎯 **5. Purpose of Testing**

* Prevent bugs.
* Improve confidence during refactoring.
* Serve as documentation.
* Ensure requirements are met.
* Support CI/CD pipelines.

---

#### 📋 **6. Best Practices**

* ✅ Test method names should describe behavior:
  `calculateTotal_shouldReturnCorrectSum()`

* ✅ Keep unit tests isolated (use mocks/stubs).

* ✅ Clean up test data after execution.

* ✅ Use meaningful assertions.

* ✅ Avoid logic in test code.

* ✅ Run tests frequently (e.g., before each commit).

* ✅ Measure code coverage (but don’t chase 100%).

---

#### ✍️ **7. Writing Tests Correctly**

**A. Naming**

* Follow: `methodName_expectedBehavior_condition()`

**B. Structure (AAA pattern)**

* **Arrange:** Setup test data & mocks.
* **Act:** Call the method being tested.
* **Assert:** Verify result using assertions.

**Example:**

```java
@Test
void sum_twoPositiveNumbers_returnsCorrectSum() {
    Calculator calc = new Calculator();

    int result = calc.sum(2, 3);

    assertEquals(5, result);
}
```

**C. For Integration Tests:**

* Use `@SpringBootTest`
* Use test-specific configuration (`application-test.yml`)
* Use in-memory DBs like H2 for isolated testing

---


