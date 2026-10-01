# Day 11: Java Arrays and React Project 1

## Objective

Practise array traversal and problem solving in Java, then apply React fundamentals in a practical task manager.

## Topics

- Array rotation using in-place reversals.
- Frequency counting while preserving first-seen order.
- Merging two sorted arrays with two pointers.
- React components, JSX, props, state, event handling, forms, lists, filtering, conditional rendering, and responsive CSS.

## Files

```text
Day-11/
├── README.md
├── linkedin-post.md
├── java-array-problems/
│   ├── README.md
│   ├── Problem1RotateArray.java
│   ├── Problem2FrequencyCount.java
│   └── Problem3MergeSortedArrays.java
└── react-project-1/
    ├── package.json
    ├── README.md
    ├── index.html
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── components/
        └── styles/
```

Exactly three Java array problems are included. Their complete statements, sample inputs/outputs, logic, line-by-line explanations, complexity, and variations are in [`java-array-problems/README.md`](java-array-problems/README.md).

## How to Run

### Java Problems

Install a JDK that includes `javac` and `java`. From the `Day-11` folder, compile the three problems:

```bash
javac -d out java-array-problems/Problem1RotateArray.java java-array-problems/Problem2FrequencyCount.java java-array-problems/Problem3MergeSortedArrays.java
```

Run each class and enter its example input:

```bash
java -cp out Problem1RotateArray
java -cp out Problem2FrequencyCount
java -cp out Problem3MergeSortedArrays
```

### React Project 1

Open a terminal in `react-project-1/`, install dependencies, and start Vite:

```bash
npm install
npm run dev
```

## What I Learned

- Different array problems call for different strategies: reversals, frequency tracking, and two pointers.
- Runtime and extra memory depend on the chosen algorithm.
- React props, state, form events, and array methods can work together to build an interactive task manager.

## Verification Status

The React project build and browser interactions were tested. The Java compiler is not installed in the authoring environment; compile the Java files with a local JDK using the commands above before marking their execution verified.