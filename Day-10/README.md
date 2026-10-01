# Day 10: Java Foundations

## Objective

Build a beginner-friendly reference for Java syntax and core programming concepts, with small examples connected to complete source files that can be compiled and run.

## Java Topics

- Introduction to Java and the JVM
- Class and `main` method syntax
- Variables and common data types
- Arithmetic, comparison, and boolean operators
- `if / else` and `switch`
- `for`, `while`, and `do-while` loops
- Arrays and enhanced `for` loops
- Methods, parameters, and return values
- Classes, objects, and constructors
- Basic OOP: encapsulation, abstraction, inheritance, and polymorphism

## Files

```text
Day-10/
├── .gitignore
├── java.html
├── style.css
├── README.md
├── linkedin-post.md
└── java/
    ├── basics/
    │   └── BasicsDemo.java
    ├── arrays/
    │   └── ArrayDemo.java
    └── oop/
        └── OopDemo.java
```

`java.html` explains each topic and links to the complete Java example files. `style.css` provides responsive page styling.

## How to Execute Java Programs

Install a JDK that provides both `javac` and `java`. From the `Day-10` folder, compile and run each example:

```bash
javac -d out java/basics/BasicsDemo.java
java -cp out BasicsDemo

javac -d out java/arrays/ArrayDemo.java
java -cp out ArrayDemo

javac -d out java/oop/OopDemo.java
java -cp out OopDemo
```

The `-d out` option places generated class files in an output directory instead of beside the source files. Open `java.html` directly in a browser or use a local static server to view the lesson.

## What I Learned

- A Java program uses classes and an entry-point `main` method.
- Variables have declared types, and operators work on those values.
- Conditions select a path; loops repeat work.
- Arrays hold a fixed-size sequence of values of one type.
- Methods package reusable behavior with inputs and return values.
- Classes and objects connect data with behavior; constructors initialize objects.
- OOP concepts help structure related types and control how they expose behavior.

## Practice Checklist

- [ ] Change the values and output in `BasicsDemo.java`.
- [ ] Add another score and update the array output.
- [ ] Add a method that returns the larger of two integers.
- [ ] Create another `Student` object and observe the overridden method.
- [ ] Compile and run all three examples with a local JDK.

## Verification Note

The lesson page and source-file links were checked in a browser. A Java compiler was not available in the authoring environment, so the `.java` files still need to be compiled with a local JDK using the commands above.