import java.util.Arrays;
import java.util.Scanner;

public class Problem1RotateArray {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int size = input.nextInt();
        int steps = input.nextInt();
        int[] values = new int[size];

        for (int index = 0; index < size; index++) {
            values[index] = input.nextInt();
        }

        rotateRight(values, steps);
        System.out.println(Arrays.toString(values));
        input.close();
    }

    static void rotateRight(int[] values, int steps) {
        int length = values.length;
        if (length == 0) {
            return;
        }

        int shift = ((steps % length) + length) % length;
        reverse(values, 0, length - 1);
        reverse(values, 0, shift - 1);
        reverse(values, shift, length - 1);
    }

    private static void reverse(int[] values, int left, int right) {
        while (left < right) {
            int temporary = values[left];
            values[left] = values[right];
            values[right] = temporary;
            left++;
            right--;
        }
    }
}