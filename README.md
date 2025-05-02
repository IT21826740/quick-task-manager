
---

```markdown
# Quick Task Manager

**Quick Task Manager** is a simple, user-friendly web application that helps users create, manage, and track their tasks effectively. Built using Spring Boot (backend) and vanilla JavaScript with Chart.js (frontend), the app provides real-time task filtering, a dashboard with visual analytics, and user-specific task storage.

---

## 🚀 Features

- ✅ Add and manage tasks
- 🔍 Filter tasks by **All**, **Pending**, or **Completed**
- 📊 Visual summary dashboard using Chart.js
- 🔐 User-specific task loading using `localStorage`-based `userId`
- 🧪 Unit & integration testing with code coverage reports
- 📈 Static code analysis via SonarQube

---

## 🛠️ Tech Stack

### Frontend
- HTML, CSS, JavaScript
- Chart.js for charts

### Backend
- Java Spring Boot
- MySQL (Docker-based)

### Tools & Testing
- Maven
- JaCoCo (Code Coverage)
- SonarQube (Static Code Analysis)
- Docker (MySQL, SonarQube)

---

## 📁 Project Structure

```

quick-task-manager/
│
├── src/
│   ├── main/
│   │   ├── java/           # Spring Boot source code
│   │   ├── resources/
│   │   │   ├── static/     # Frontend HTML, JS, CSS files
│   │   │   └── application.properties
│   ├── test/               # Unit & integration tests
│
├── pom.xml                 # Maven config
├── README.md               # Project documentation
└── ...

````

---

## 🧑‍💻 How to Run the Project

### 🔄 Backend Setup (Spring Boot + MySQL in Docker)

1. **Start Docker & DB Container**  
   Make sure Docker is running and MySQL container is started.

2. **Open Project in IntelliJ IDEA or IDE of your choice**

3. **Access MySQL Container**
   ```bash
   docker exec -it <container_name> /bin/bash
   mysql -u root -p
   # Enter your password
````

4. **Run Spring Boot App**

   ```bash
   mvn spring-boot:run
   ```

---

### 🌐 Frontend Setup

1. **Run Frontend Locally**
   In your terminal:

   ```bash
   cd /path/to/project
   google-chrome http://localhost:8080/login.html
   ```

2. **Frontend Files Location**

   ```
   src/main/resources/static/
   ├── index.html         # Task list
   ├── summary.html       # Task summary with chart
   ├── login.html         # Login interface
   ├── main.js            # Task logic & chart rendering
   └── style.css          # Basic styling
   ```

3. **Set userId in Local Storage**
   Open browser console and enter:

   ```js
   localStorage.setItem("userId", "your-user-id");
   ```

---

## 🧪 Testing & Code Coverage

1. **Run All Tests**

   ```bash
   mvn clean test
   ```

2. **Generate JaCoCo Code Coverage Report**

   ```bash
   mvn jacoco:report
   ```

3. **View Report**
   Open the file:

   ```
   target/site/jacoco/index.html
   ```

---

## 📊 SonarQube Setup (Optional)

1. **Start Local SonarQube Server**

   ```bash
   docker run -d --name sonarqube -p 9000:9000 sonarqube:latest
   ```

2. **Login to SonarQube**

   * Visit: [http://localhost:9000](http://localhost:9000)
   * Default credentials: `admin` / `admin`
   * Change password when prompted

3. **Generate Sonar Token**

   * Go to **My Account > Security**
   * Create a new token

4. **Run Sonar Analysis**

   ```bash
   mvn sonar:sonar \
     -Dsonar.projectKey=quick-task-manager \
     -Dsonar.host.url=http://localhost:9000 \
     -Dsonar.login=<YOUR_SONARQUBE_TOKEN> \
     -Dsonar.coverage.jacoco.xmlReportPaths=target/site/jacoco/jacoco.xml
   ```

5. **View Analysis Results**

   * Open: [http://localhost:9000](http://localhost:9000)
   * Select your project to view metrics:

     * Code coverage
     * Bugs, vulnerabilities
     * Code smells and duplications

---

## 🙌 Contributing

Contributions are welcome! Feel free to:

* Fork the repo
* Open issues
* Submit pull requests

---

---

## 📬 Contact

Have any questions or suggestions?
Feel free to reach out or open an issue in the repository.

```

