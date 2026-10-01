public class BasicsDemo {
    public static void main(String[] args) {
        int age = 21;
        double temperature = 22.5;
        char grade = 'A';
        boolean learning = true;
        String language = "Java";
        System.out.println("Types: " + age + " " + temperature + " " + grade + " " + learning + " " + language);

        int total = 12 + 5;
        int remainder = total % 4;
        boolean enough = total >= 15;
        System.out.println("Operators: " + total + " " + remainder + " " + enough);

        int score = 74;
        if (score >= 60) {
            System.out.println("Pass");
        } else {
            System.out.println("Try again");
        }

        String day = "MON";
        switch (day) {
            case "MON":
                System.out.println("Start");
                break;
            default:
                System.out.println("Other day");
                break;
        }

        for (int number = 1; number <= 3; number++) {
            System.out.println("For: " + number);
        }

        int count = 2;
        while (count > 0) {
            System.out.println("While: " + count);
            count--;
        }

        int attempts = 0;
        do {
            attempts++;
            System.out.println("Do-while: " + attempts);
        } while (attempts < 1);

        System.out.println("Method sum: " + add(4, 5));
    }

    static int add(int left, int right) {
        return left + right;
    }
}