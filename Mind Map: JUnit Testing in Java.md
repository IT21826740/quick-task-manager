
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

