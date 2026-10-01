abstract class Member {
    abstract String introduce();
}

class Person extends Member {
    private final String name;

    Person(String name) {
        this.name = name;
    }

    String getName() {
        return name;
    }

    @Override
    String introduce() {
        return "Hello, I'm " + name + ".";
    }
}

class Student extends Person {
    private final String subject;

    Student(String name, String subject) {
        super(name);
        this.subject = subject;
    }

    @Override
    String introduce() {
        return "I'm " + getName() + ", a " + subject + " student.";
    }
}

public class OopDemo {
    public static void main(String[] args) {
        Member mentor = new Person("Mina");
        Member learner = new Student("Leo", "Java");

        System.out.println(mentor.introduce());
        System.out.println(learner.introduce());
    }
}