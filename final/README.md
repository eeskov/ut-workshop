Create a TypeScript class Library to manage a small collection of books. Each book has a title, author, and an availability status (whether it's currently checked out or not).

interfaces:
```
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

```

Write tests for Library class