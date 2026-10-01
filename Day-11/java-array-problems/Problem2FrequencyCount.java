import java.util.Scanner;

public class Problem2FrequencyCount {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int size = input.nextInt();
        int[] values = new int[size];

        for (int index = 0; index < size; index++) {
            values[index] = input.nextInt();
        }

        boolean[] counted = new boolean[size];
        for (int index = 0; index < size; index++) {
            if (counted[index]) {
                continue;
            }

            int frequency = 1;
            for (int next = index + 1; next < size; next++) {
                if (values[index] == values[next]) {
                    frequency++;
                    counted[next] = true;
                }
            }

            System.out.println(values[index] + ": " + frequency);
        }

        input.close();
    }
}