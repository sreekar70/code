import java.time.*;
import java.util.*;

/**
 * Event Scheduler
 * A simple Java project to manage and organize events with date and time.
 */
public class EventScheduler {

    static class Event {
        private final int id;
        private final String title;
        private final LocalDateTime dateTime;
        private final String location;

        public Event(int id, String title, LocalDateTime dateTime, String location) {
            this.id = id;
            this.title = title;
            this.dateTime = dateTime;
            this.location = location;
        }

        public int getId() {
            return id;
        }

        public String getTitle() {
            return title;
        }

        public LocalDateTime getDateTime() {
            return dateTime;
        }

        public String getLocation() {
            return location;
        }

        @Override
        public String toString() {
            return "Event ID: " + id + "\n" +
                   "Title: " + title + "\n" +
                   "Date & Time: " + dateTime + "\n" +
                   "Location: " + location;
        }
    }

    static class EventManager {
        private final List<Event> events = new ArrayList<>();
        private int eventIdCounter = 1;

        public void addEvent(String title, LocalDateTime dateTime, String location) {
            Event event = new Event(eventIdCounter++, title, dateTime, location);
            events.add(event);
            System.out.println("Event added successfully!");
        }

        public void viewEvents() {
            if (events.isEmpty()) {
                System.out.println("No events scheduled.");
                return;
            }
            System.out.println("Scheduled Events:");
            events.forEach(event -> {
                System.out.println(event);
                System.out.println("-----------------------");
            });
        }

        public void deleteEvent(int id) {
            events.removeIf(event -> event.getId() == id);
            System.out.println("Event deleted successfully!");
        }

        public void filterEventsByDate(LocalDate date) {
            System.out.println("Events on " + date + ":");
            events.stream()
                    .filter(event -> event.getDateTime().toLocalDate().equals(date))
                    .forEach(event -> {
                        System.out.println(event);
                        System.out.println("-----------------------");
                    });
        }

        public void upcomingEvents() {
            System.out.println("Upcoming Events:");
            LocalDateTime now = LocalDateTime.now();
            events.stream()
                    .filter(event -> event.getDateTime().isAfter(now))
                    .sorted(Comparator.comparing(Event::getDateTime))
                    .forEach(event -> {
                        System.out.println(event);
                        System.out.println("-----------------------");
                    });
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        EventManager eventManager = new EventManager();

        while (true) {
            System.out.println("\nEvent Scheduler");
            System.out.println("1. Add Event");
            System.out.println("2. View All Events");
            System.out.println("3. Delete Event");
            System.out.println("4. Filter Events by Date");
            System.out.println("5. View Upcoming Events");
            System.out.println("6. Exit");
            System.out.print("Choose an option: ");

            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume newline

            switch (choice) {
                case 1 -> {
                    System.out.print("Enter event title: ");
                    String title = scanner.nextLine();
                    System.out.print("Enter event date and time (YYYY-MM-DDTHH:MM): ");
                    LocalDateTime dateTime = LocalDateTime.parse(scanner.nextLine());
                    System.out.print("Enter event location: ");
                    String location = scanner.nextLine();
                    eventManager.addEvent(title, dateTime, location);
                }
                case 2 -> eventManager.viewEvents();
                case 3 -> {
                    System.out.print("Enter event ID to delete: ");
                    int id = scanner.nextInt();
                    eventManager.deleteEvent(id);
                }
                case 4 -> {
                    System.out.print("Enter date to filter by (YYYY-MM-DD): ");
                    LocalDate date = LocalDate.parse(scanner.nextLine());
                    eventManager.filterEventsByDate(date);
                }
                case 5 -> eventManager.upcomingEvents();
                case 6 -> {
                    System.out.println("Exiting Event Scheduler. Goodbye!");
                    scanner.close();
                    return;
                }
                default -> System.out.println("Invalid option. Please try again.");
            }
        }
    }
}
