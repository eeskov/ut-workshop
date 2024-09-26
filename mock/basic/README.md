```
beforeEach(callback)
```
```beforeEach``` is a hook that runs before each test case (it block) within a describe block. It's useful for setting up common test data or configurations required by multiple tests.


```vi``` is Vitest's built-in mocking utility, providing functions to create mocks, spies, and manage mock states. It is analogous to Jest's jest object.

```
const mockFunction = vi.fn();
```
```vi.fn()``` creates a mock function. Mock functions are useful for testing callbacks, replacing real functions, and tracking how functions are called.

```vi.clearAllMocks()``` clears the usage data of all mocks. This includes information about how many times they were called and with what arguments. It does not remove the mock implementations.