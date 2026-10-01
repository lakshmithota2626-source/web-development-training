public class ArrayDemo {
    public static void main(String[] args) {
        int[] scores = {80, 95, 70};
        int total = 0;

        System.out.print("Scores: ");
        for (int score : scores) {
            System.out.print(score + " ");
            total += score;
        }

        double average = (double) total / scores.length;
        System.out.println();
        System.out.printf("Average: %.1f%n", average);
    }
}