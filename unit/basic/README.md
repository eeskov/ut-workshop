```import { describe, it, expect } from 'vitest'```

```
describe(description, callback)
```
```describe``` is used to group related test cases together. It helps in organizing tests into coherent sections, making the test suite more readable and maintainable.


```
it(description, callback)
```
```it``` defines an individual test case. Each it block should test a specific behavior or functionality of the code under test.

```
expect(actual)
  .matcher(expected)
```

```expect``` is used to create assertions that verify the behavior of the code under test. It takes a value and allows you to apply various matchers to assert conditions about that value. https://vitest.dev/api/expect.html
