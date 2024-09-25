# Magic Academy

Courses platform mainly focused on high quality software development courses

## Project setup

### Prerequisites

#### Package Manager

[pnpm](https://pnpm.io/es/installation) is **_faster_** than npm or yarn.

##### Installation

```bash
npm i -g pnpm
```

##### pnpm vs npm

Check out why pnpm is faster! (any video bellow):

- [English video](https://www.youtube.com/watch?v=d1E31WPR70g) from [CoderOne](https://www.youtube.com/@CoderOne) - YouTube
- [Spanish video](https://www.youtube.com/watch?v=MZ6JxWWCA5M) from [Fazt Code](https://www.youtube.com/@FaztCode) - YouTube

#### Environment variables
Copy the `.env.example` content and create the `.env` file in the root of the project folder structure

### Running the project

1. Clone the repo.
2. Install dependencies.
   ```bash
   pnpm i
   ```
3. Run development server.
   ```bash
   pnpm dev
   ```

## Developing
### Adding shadcn/ui components
Use the following command to use **pnpm** instead of npm:

```bash
pnpx shadcn@latest add <component-name>
```

## Contributing
We follow the **Conventional Commits** standard to make commit changes.

Learn more about it in the following link: *[CONTRIBUTING.md](./CONTRIBUTING.md)*