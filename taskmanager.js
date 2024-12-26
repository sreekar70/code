import java.util.*;
import java.time.*;

/**
 * Task Management System
 * A simple console-based project to manage tasks, deadlines, and priorities.
 */
public class TaskManagementSystem {

    static class Task {
        private final int id;
        private final String name;
        private final LocalDate deadline;
        private final String priority;

        public Task(int id, String name, LocalDate deadline, String priority) {
            this.id = id;
            this.name = name;
            this.deadline = deadline;
            this.priority = priority;
        }

        public int getId() {
            return id;
        }

        public String getName() {
            return name;
        }

        public LocalDate getDeadline() {
            return deadline;
        }

        public String getPriority() {
            return priority;
        }

        @Override
        public String toString() {
            return "Task ID: " + id + "\n" +
                   "Name: " + name + "\n" +
                   "Deadline: " + deadline + "\n" +
                   "Priority: " + priority;
        }
    }

    static class TaskManager {
        private final List<Task> tasks = new ArrayList<>();
        private int taskIdCounter = 1;

        public void addTask(String name, LocalDate deadline, String priority) {
            Task task = new Task(taskIdCounter++, name, deadline, priority);
            tasks.add(task);
            System.out.println("Task added successfully!");
        }

        public void viewTasks() {
            if (tasks.isEmpty()) {
                System.out.println("No tasks available.");
                return;
            }
            System.out.println("Current Tasks:");
            tasks.forEach(task -> {
                System.out.println(task);
                System.out.println("-----------------------");
            });
        }

        public void deleteTask(int id) {
            tasks.removeIf(task -> task.getId() == id);
            System.out.println("Task deleted successfully!");
        }

        public void filterTasksByPriority(String priority) {
            System.out.println("Tasks with priority " + priority + ":");
            tasks.stream()
                    .filter(task -> task.getPriority().equalsIgnoreCase(priority))
                    .forEach(task -> {
                        System.out.println(task);
                        System.out.println("-----------------------");
                    });
        }

        public void filterTasksByDeadline(LocalDate date) {
            System.out.println("Tasks with deadline on or before " + date + ":");
            tasks.stream()
                    .filter(task -> !task.getDeadline().isAfter(date))
                    .forEach(task -> {
                        System.out.println(task);
                        System.out.println("-----------------------");
                    });
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        TaskManager taskManager = new TaskManager();

        while (true) {
            System.out.println("\nTask Management System");
            System.out.println("1. Add Task");
            System.out.println("2. View Tasks");
            System.out.println("3. Delete Task");
            System.out.println("4. Filter Tasks by Priority");
            System.out.println("5. Filter Tasks by Deadline");
            System.out.println("6. Exit");
            System.out.print("Choose an option: ");

            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume newline

            switch (choice) {
                case 1 -> {
                    System.out.print("Enter task name: ");
                    String name = scanner.nextLine();
                    System.out.print("Enter deadline (YYYY-MM-DD): ");
                    LocalDate deadline = LocalDate.parse(scanner.nextLine());
                    System.out.print("Enter priority (High, Medium, Low): ");
                    String priority = scanner.nextLine();
                    taskManager.addTask(name, deadline, priority);
                }
                case 2 -> taskManager.viewTasks();
                case 3 -> {
                    System.out.print("Enter task ID to delete: ");
                    int id = scanner.nextInt();
                    taskManager.deleteTask(id);
                }
                case 4 -> {
                    System.out.print("Enter priority to filter by (High, Medium, Low): ");
                    String priority = scanner.nextLine();
                    taskManager.filterTasksByPriority(priority);
                }
                case 5 -> {
                    System.out.print("Enter deadline date to filter by (YYYY-MM-DD): ");
                    LocalDate date = LocalDate.parse(scanner.nextLine());
                    taskManager.filterTasksByDeadline(date);
                }
                case 6 -> {
                    System.out.println("Exiting Task Management System. Goodbye!");
                    scanner.close();
                    return;
                }
                default -> System.out.println("Invalid option. Please try again.");
            }
        }
    }
}
