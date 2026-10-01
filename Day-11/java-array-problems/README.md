# Day 11: Three Java Array Problems

These three beginner-to-intermediate problems practise different array skills. Each link opens the complete, executable Java source file.

## Problem 1: Rotate an Array Right

### Problem Statement

Given an integer array and a number of steps, rotate the values to the right. Values that move past the end wrap around to the beginning.

### Input

The first line contains the array length and rotation count. The second line contains the array values.

```text
7 3
1 2 3 4 5 6 7
```

### Output

```text
[5, 6, 7, 1, 2, 3, 4]
```

### Logic

Normalize the rotation count so it is between zero and the array length minus one. Reverse the whole array, reverse the first `steps` values, then reverse the remaining values. The three reversals produce a right rotation without a second array.

### Complete Java Code

[`Problem1RotateArray.java`](Problem1RotateArray.java)

### Line-by-Line Explanation

| Source line | Explanation |
|---:|---|
| 1 | Imports `Arrays` so the result can be printed in readable bracket notation. |
| 2 | Imports `Scanner` to read numbers from standard input. |
| 4 | Declares the public class; its name matches the source filename. |
| 5 | Starts Java's program entry point. |
| 6 | Creates the input reader. |
| 7 | Reads how many array values follow. |
| 8 | Reads how many right rotations to perform. |
| 9 | Allocates an integer array of the requested size. |
| 11 | Starts a loop that visits each array index. |
| 12 | Reads the next integer into the current position. |
| 13 | Ends the input loop. |
| 15 | Calls the method that rotates the array in place. |
| 16 | Prints the resulting array. |
| 17 | Closes the input reader. |
| 20 | Declares a helper method that changes the array and returns no value. |
| 21 | Stores the array length so it can be reused. |
| 22 | Checks the empty-array edge case. |
| 23 | Returns immediately when there is nothing to rotate. |
| 24 | Ends the empty-array condition. |
| 26 | Normalizes large or negative step counts to a valid rotation amount. |
| 27 | Reverses the full array. |
| 28 | Reverses the first part, which will become the rotated prefix. |
| 29 | Reverses the remaining part to restore each part's order. |
| 30 | Ends the rotation method. |
| 32 | Declares a helper that reverses values between two indexes. |
| 33 | Continues swapping while the left index is before the right index. |
| 34 | Saves the left value before it is overwritten. |
| 35 | Moves the right-side value into the left position. |
| 36 | Moves the saved left-side value into the right position. |
| 37 | Advances the left index inward. |
| 38 | Moves the right index inward. |
| 39-41 | Close the loop, helper method, and class. |

### Example Execution

```text
Input:  7 3, then 1 2 3 4 5 6 7
Output: [5, 6, 7, 1, 2, 3, 4]
```

### Complexity

- Time: `O(n)`; each reversal visits at most the array length.
- Extra space: `O(1)`; the swaps happen in the original array.

### Optional Variation

Change the method to rotate left while still using the same reversal helper.

## Problem 2: Count Each Value's Frequency

### Problem Statement

Given an integer array, print each distinct value and how often it occurs. Keep the output order based on each value's first appearance.

### Input

The first line contains the array length. The second line contains the array values.

```text
8
4 2 4 3 2 4 1 3
```

### Output

```text
4: 3
2: 2
3: 2
1: 1
```

### Logic

Use a `counted` boolean array to remember which positions have already been included in a frequency. For each uncounted value, scan the later positions, count matches, mark each match, and print the total.

### Complete Java Code

[`Problem2FrequencyCount.java`](Problem2FrequencyCount.java)

### Line-by-Line Explanation

| Source line | Explanation |
|---:|---|
| 1 | Imports `Scanner` for reading console input. |
| 3 | Declares the public class that contains this solution. |
| 4 | Starts the `main` entry point. |
| 5 | Creates the input reader. |
| 6 | Reads the number of values. |
| 7 | Allocates the array to hold those values. |
| 9 | Starts the loop that fills the input array. |
| 10 | Reads one value into the current array position. |
| 11 | Ends the input loop. |
| 13 | Creates a boolean marker for each position; all values begin as `false`. |
| 14 | Starts the outer loop, choosing each possible first occurrence. |
| 15 | Checks whether an earlier scan already counted this position. |
| 16 | Skips positions already included in a printed frequency. |
| 17 | Ends the `if` block. |
| 19 | Starts the frequency at one for the current value itself. |
| 20 | Scans positions that come after the current one. |
| 21 | Checks whether a later value matches the current value. |
| 22 | Increments the match count. |
| 23 | Marks the matching position so it is not printed again. |
| 24-25 | Close the match condition and inner loop. |
| 27 | Prints the current value and its total frequency. |
| 28 | Ends the outer loop. |
| 30 | Closes the input reader after all values are processed. |
| 31-32 | Close the `main` method and class. |

### Example Execution

```text
Input:  8, then 4 2 4 3 2 4 1 3
Output: 4: 3; 2: 2; 3: 2; 1: 1
```

### Complexity

- Time: `O(n^2)`; each value may scan the values after it.
- Extra space: `O(n)` for the `counted` marker array.

### Optional Variation

Use a `HashMap<Integer, Integer>` to count frequencies in one pass, then compare its space and ordering behavior with this array-only version.

## Problem 3: Merge Two Sorted Arrays

### Problem Statement

Given two arrays already sorted in ascending order, create one ascending array containing every value from both inputs.

### Input

The first line contains the first array length, followed by its values. The next line contains the second length, followed by its values.

```text
4
1 4 8 12
3
2 6 10
```

### Output

```text
[1, 2, 4, 6, 8, 10, 12]
```

### Logic

Keep one index for each input array and one for the result. Compare the current values, copy the smaller value, and advance that input index. When one input is exhausted, copy the other input's remaining values.

### Complete Java Code

[`Problem3MergeSortedArrays.java`](Problem3MergeSortedArrays.java)

### Line-by-Line Explanation

| Source line | Explanation |
|---:|---|
| 1 | Imports `Arrays` to print the merged result. |
| 2 | Imports `Scanner` to read the array lengths and values. |
| 4 | Declares the public class for this solution. |
| 5 | Starts the `main` entry point. |
| 6 | Creates the input reader. |
| 7 | Reads the first array length. |
| 8 | Allocates the first input array. |
| 9 | Starts the loop that reads the first array. |
| 10 | Stores one first-array value at the current index. |
| 11 | Ends the first input loop. |
| 13 | Reads the second array length. |
| 14 | Allocates the second input array. |
| 15 | Starts the loop that reads the second array. |
| 16 | Stores one second-array value at the current index. |
| 17 | Ends the second input loop. |
| 19 | Calls the merge method and stores its returned array. |
| 20 | Prints the merged values. |
| 21 | Closes the input reader. |
| 24 | Declares a method that returns the merged integer array. |
| 25 | Allocates exactly enough positions for both input arrays. |
| 26-28 | Initialize indexes for the first array, second array, and result. |
| 30 | Continues while both input arrays still have values. |
| 31 | Compares the current values from the two arrays. |
| 32 | Copies the smaller first-array value and advances both relevant indexes. |
| 33 | Starts the alternative when the second value is smaller. |
| 34 | Copies the second-array value and advances its index and the result index. |
| 35-36 | Close the alternative branch and comparison loop. |
| 38-40 | Copy any remaining values from the first array. |
| 41-43 | Copy any remaining values from the second array. |
| 45 | Returns the completed result array. |
| 46-47 | Close the merge method and class. |

### Example Execution

```text
Input:  first array [1, 4, 8, 12]; second array [2, 6, 10]
Output: [1, 2, 4, 6, 8, 10, 12]
```

### Complexity

- Time: `O(n + m)`; each value is visited once.
- Extra space: `O(n + m)` for the merged result.

### Optional Variation

Update the comparison to merge two arrays sorted in descending order.

## Compile and Run

From the `Day-11` folder, compile the three source files:

```bash
javac -d out java-array-problems/Problem1RotateArray.java java-array-problems/Problem2FrequencyCount.java java-array-problems/Problem3MergeSortedArrays.java
```

Run one problem at a time and enter its example input:

```bash
java -cp out Problem1RotateArray
java -cp out Problem2FrequencyCount
java -cp out Problem3MergeSortedArrays
```