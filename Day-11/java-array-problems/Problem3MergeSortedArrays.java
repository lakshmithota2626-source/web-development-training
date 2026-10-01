import java.util.Arrays;
import java.util.Scanner;

public class Problem3MergeSortedArrays {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int firstSize = input.nextInt();
        int[] first = new int[firstSize];
        for (int index = 0; index < firstSize; index++) {
            first[index] = input.nextInt();
        }

        int secondSize = input.nextInt();
        int[] second = new int[secondSize];
        for (int index = 0; index < secondSize; index++) {
            second[index] = input.nextInt();
        }

        int[] merged = merge(first, second);
        System.out.println(Arrays.toString(merged));
        input.close();
    }

    static int[] merge(int[] first, int[] second) {
        int[] merged = new int[first.length + second.length];
        int firstIndex = 0;
        int secondIndex = 0;
        int mergedIndex = 0;

        while (firstIndex < first.length && secondIndex < second.length) {
            if (first[firstIndex] <= second[secondIndex]) {
                merged[mergedIndex++] = first[firstIndex++];
            } else {
                merged[mergedIndex++] = second[secondIndex++];
            }
        }

        while (firstIndex < first.length) {
            merged[mergedIndex++] = first[firstIndex++];
        }
        while (secondIndex < second.length) {
            merged[mergedIndex++] = second[secondIndex++];
        }

        return merged;
    }
}