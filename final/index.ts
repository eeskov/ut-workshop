interface Book {
    title: string;
    author: string;
}

interface Library {
    addBook(title: string, author: string): void
    takeBook(title: string): void
    returnBook(title: string): void
    listAvailableBooks(): Book[]
}

export default class MyLibrary implements Library {
    addBook(title: string, author: string): void {}

    takeBook(title: string): void {}

    returnBook(title: string): void {}

    listAvailableBooks(): Book[] {}
}