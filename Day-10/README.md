# Day 10 — Java Foundations & Object-Oriented Programming

## Objective

Build a solid foundational understanding of the Java programming language, the Java Virtual Machine (JVM) execution lifecycle, strongly-typed variables, control flow, methods, arrays, and core Object-Oriented Programming (OOP) principles through documented lessons and executable source files.

## Technologies

- **Java (JDK 17+):** Class blueprints, static `main` entry point, primitive types, loops, reference types, OOP
- **HTML5 & CSS3:** Interactive reference lesson interface (`java.html`) with responsive styling
- **Architecture Concepts:** JVM, JRE, JDK, bytecode compilation (`.class`), garbage collection, memory management (Stack vs Heap)

## Features

- **Java Foundations Visual Reference (`java.html`):** Comprehensive interactive guide explaining Java history, compilation workflow, data types, operators, conditionals, loops, array traversal, methods, and classes.
- **Runnable Java Source Code:**
  - `BasicsDemo.java`: Demonstrates primitive variables, arithmetic/logical operations, `if/else`, `switch`, and `for`/`while` loops.
  - `ArrayDemo.java`: Demonstrates fixed-size array declarations, indexed loops, enhanced for-each loops, finding min/max, and array summation.
  - `OopDemo.java`: Demonstrates classes, constructors, private fields, encapsulation, inheritance (`extends`), method overriding (polymorphism), and abstract concepts.
- **Responsive Web Presentation:** Clear code listings with syntax highlights and compilation tips.

## Project Structure

```text
Day-10/
├── java.html         # Interactive web reference for Java concepts
├── style.css         # Modern styling for the web guide
├── linkedin-post.md  # Day 10 LinkedIn post draft
├── README.md         # Standardized Day 10 documentation
└── java/
    ├── basics/
    │   └── BasicsDemo.java   # Primitive types, conditionals, loops
    ├── arrays/
    │   └── ArrayDemo.java    # Array operations, traversals, min/max
    └── oop/
        └── OopDemo.java      # Classes, inheritance, polymorphism, encapsulation
```

## How to Run

1. **View the Web Documentation:**
   Open `Day-10/java.html` directly in your browser or serve locally:
   ```bash
   python -m http.server 5500
   ```
   Navigate to `http://localhost:5500/Day-10/java.html`.

2. **Compile and Run Java Files:**
   *Note: Requires a Java Development Kit (JDK 17 or later) installed on your system with `javac` and `java` available in your system PATH.*
   
   From the `Day-10/` folder:
   ```bash
   # Compile to an output directory
   javac -d out java/basics/BasicsDemo.java
   java -cp out BasicsDemo

   javac -d out java/arrays/ArrayDemo.java
   java -cp out ArrayDemo

   javac -d out java/oop/OopDemo.java
   java -cp out OopDemo
   ```

## What I Learned

- How the JVM architecture achieves platform independence ("Write Once, Run Anywhere") through bytecode execution.
- Strict static typing in Java compared to dynamic typing in JavaScript: every variable, parameter, and method return must declare its type.
- The distinction between primitive types stored directly on the Stack (`int`, `double`, `boolean`) and reference objects stored in Heap memory.
- Core pillars of OOP:
  - **Encapsulation:** Hiding internal state with `private` access modifiers and exposing controlled getters/setters.
  - **Inheritance:** Code reuse through `extends` and calling parent constructors with `super()`.
  - **Polymorphism:** Method overriding and treating derived instances through superclass references.
  - **Abstraction:** Hiding complex implementation details using abstract classes and interfaces.

## Challenges

- **Transitioning from JavaScript to Java:** Adapting to static type constraints, explicit access specifiers (`public`, `private`, `protected`), and mandatory class wrappers for entry-point logic.
- **Environment Verification:** Recognizing that compilation requires a local JDK installation (`javac`), distinct from web browser runtimes.

## Future Improvements

- Add examples covering Java Collections Framework (`ArrayList`, `HashMap`, `HashSet`).
- Implement exception handling (`try-catch-finally`, custom exceptions).
- Introduce Java Streams API and Lambda expressions (`map`, `filter`, `collect`) to parallel JavaScript functional methods.