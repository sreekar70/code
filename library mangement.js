import java.util.*;

/**
 * Library Management System
 * A console-based Java project to manage books and users in a library.
 */
public class LibraryManagementSystem {

    static class Book {
        private final int id;
        private final String title;
        private final String author;
        private boolean isAvailable;

        public Book(int id, String title, String author) {
            this.id = id;
            this.title = title;
            this.author = author;
            this.isAvailable = true;
        }

        public int getId() {
            return id;
        }

        public String getTitle() {
            return title;
        }

        public String getAuthor() {
            return author;
        }

        public boolean isAvailable() {
            return isAvailable;
        }

        public void setAvailable(boolean available) {
            isAvailable = available;
        }

        @Override
        public String toString() {
            return "Book ID: " + id + "\n" +
                   "Title: " + title + "\n" +
                   "Author: " + author + "\n" +
                   "Available: " + (isAvailable ? "Yes" : "No");
        }
    }

    static class Library {
        private final List<Book> books = new ArrayList<>();
        private int bookIdCounter = 1;

        public void addBook(String title, String author) {
            Book book = new Book(bookIdCounter++, title, author);
            books.add(book);
            System.out.println("Book added successfully!");
        }

        public void viewBooks() {
            if (books.isEmpty()) {
                System.out.println("No books available in the library.");
                return;
            }
            System.out.println("Books in Library:");
            books.forEach(book -> {
                System.out.println(book);
                System.out.println("-----------------------");
            });
        }

        public void borrowBook(int id) {
            for (Book book : books) {
                if (book.getId() == id) {
                    if (book.isAvailable()) {
                        book.setAvailable(false);
                        System.out.println("You have borrowed the book: " + book.getTitle());
                    } else {
                        System.out.println("Sorry, the book is currently unavailable.");
                    }
                    return;
                }
            }
            System.out.println("Book not found.");
        }

        public void returnBook(int id) {
            for (Book book : books) {
                if (book.getId() == id) {
                    if (!book.isAvailable()) {
                        book.setAvailable(true);
                        System.out.println("You have returned the book: " + book.getTitle());
                    } else {
                        System.out.println("The book was not borrowed.");
                    }
                    return;
                }
            }
            System.out.println("Book not found.");
        }

        public void searchBookByTitle(String title) {
            System.out.println("Searching for books with title containing: " + title);
            books.stream()
                    .filter(book -> book.getTitle().toLowerCase().contains(title.toLowerCase()))
                    .forEach(book -> {
                        System.out.println(book);
                        System.out.println("-----------------------");
                    });
        }

        public void searchBookByAuthor(String author) {
            System.out.println("Searching for books by author: " + author);
            books.stream()
                    .filter(book -> book.getAuthor().toLowerCase().contains(author.toLowerCase()))
                    .forEach(book -> {
                        System.out.println(book);
                        System.out.println("-----------------------");
                    });
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Library library = new Library();

        while (true) {
            System.out.println("\nLibrary Management System");
            System.out.println("1. Add Book");
            System.out.println("2. View All Books");
            System.out.println("3. Borrow Book");
            System.out.println("4. Return Book");
            System.out.println("5. Search Book by Title");
            System.out.println("6. Search Book by Author");
            System.out.println("7. Exit");
            System.out.print("Choose an option: ");

            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume newline

            switch (choice) {
                case 1 -> {
                    System.out.print("Enter book title: ");
                    String title = scanner.nextLine();
                    System.out.print("Enter book author: ");
                    String author = scanner.nextLine();
                    library.addBook(title, author);
                }
                case 2 -> library.viewBooks();
                case 3 -> {
                    System.out.print("Enter book ID to borrow: ");
                    int id = scanner.nextInt();
                    library.borrowBook(id);
                }
                case 4 -> {
                    System.out.print("Enter book ID to return: ");
                    int id = scanner.nextInt();
                    library.returnBook(id);
                }
                case 5 -> {
                    System.out.print("Enter title to search: ");
                    String title = scanner.nextLine();
                    library.searchBookByTitle(title);
                }
                case 6 -> {
                    System.out.print("Enter author to search: ");
                    String author = scanner.nextLine();
                    library.searchBookByAuthor(author);
                }
                case 7 -> {
                    System.out.println("Exiting Library Management System. Goodbye!");
                    scanner.close();
                    return;
                }
                default -> System.out.println("Invalid option. Please try again.");
            }
        }
    }
}
