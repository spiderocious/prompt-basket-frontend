## Product Doc

PromptBasket is a tool that allows you to create and manage prompts for AI models. It provides a user-friendly interface to organize your prompts, making it easier to find and use them when needed. With PromptBasket, you can save time and improve your workflow by having all your prompts in one place. Whether you're a developer, researcher, or content creator, PromptBasket can help you streamline your prompt management process.


Users have 
1. Prompt Library
2. Prompt Editor
3. Prompt Bucket


For now, no backend, we'll be using local storage, the idea is that it should be used as some sort of a level of abstraction allowing to be able to easily switch to a backend in the future if needed. The main focus is on the frontend and user experience, making it easy for users to create, edit, and manage their prompts effectively.

so for instance, we have the prompt library service => that then uses something like promptStorage.getPrompts()


the getPrompts() then uses based on the dependency injection, it can use either local storage or a backend API to fetch the prompts. This way, we can easily switch between different storage options without affecting the rest of the application. The prompt library service will handle all the logic related to fetching, saving, and managing prompts, while the storage layer will be responsible for the actual data storage and retrieval. This separation of concerns allows for better maintainability and scalability of the application in the future.


sample code for the prompt library service:

on the list of prompts for instance

we do promptService.getAllPrompts() => promptStorage.getPrompts() => api.getPrompts() now the api here will be dependency injected, so we'll have apiService later, and also localStorageService,

both services having the same interface, so we can easily switch between them without affecting the rest of the application. The prompt library service will handle all the logic related to fetching, saving, and managing prompts, while the storage layer will be responsible for the actual data storage and retrieval. This separation of concerns allows for better maintainability and scalability of the application in the future.


## Features

- User can create, edit, and delete prompts
- User can organize prompts into categories or folders called "Prompt Buckets"
- User can search and filter prompts in the Prompt Library
- User can copy prompts to clipboard for easy use in other applications
- User can edit prompts using a rich text editor with support for markdown formatting and preview and resave the prompt in the library


## Design Requirements
- The application should have a clean and intuitive user interface
- Clean stripe level design with a focus on usability and accessibility
- Responsive design to ensure it works well on different devices and screen sizes
- Animated interactions and transitions to enhance the user experience, use animated icons too
- Use of color and typography to create a visually appealing and cohesive design
- Consistent design language throughout the application to create a cohesive user experience
- Use of icons and visual cues to guide users through the application and make it easier to understand
- Clear and concise labeling of buttons and actions to improve usability
- Use of whitespace to create a clean and organized layout
- Accessibility features such as keyboard navigation and screen reader support to ensure the application is usable by all users


## Tech spec:
- Frontend: React with TypeScript for type safety and better developer experience
- State Management: No complex or global  state management at all, use inbuilt react state, context and pass props/data down the component tree, this will keep the application simple and easy to maintain
- use hooks for different thing and to abstract away logic from the components, for instance, we can have a usePrompts hook that handles all the logic related to fetching, saving, and managing prompts, this way we can keep our components clean and focused on rendering the UI
- use tailwind css for styling, it will allow us to quickly and easily create a responsive and visually appealing design without having to write a lot of custom CSS
- use local storage for data persistence, this will allow us to save prompts locally on the user's device without the need for a backend, and we can easily switch to a backend in the future if needed by simply changing the storage implementation without affecting the rest of the application

Color palette:
- Primary: #4F46E5 (Indigo)
- Secondary: #6B7280 (Gray)
- Accent: #FBBF24 (Yellow)
- Background: #FFFFFF (White)
- Text: #111827 (Dark Gray)

- Ensure colors are setup in such a way that we can switch to other pallettes!
Typography:
- Font family: quicksand, sans-serif
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap');

- use feature sliced design for better organization and separation of concerns, this will allow us to keep our codebase clean and maintainable as the application grows in complexity. Each feature will have its own folder containing all the related components, hooks, services, and styles, making it easier to navigate and understand the codebase. This approach also promotes reusability and makes it easier to test individual features without affecting the rest of the application.

 sample folder structure:
src/
    features/
        entrypoint/
            hooks/
            types/
            services/
            parts/
            components/
            index.tsx
        prompt-bucket/
            hooks/
            types/
            services/
            parts/
            components/
            index.tsx
    shared/
        ui/
        utils/
        services/
        types/
        hooks/


- use barrel exports to simplify imports and improve code readability, this will allow us to import multiple components, hooks, or services from a single file instead of having to import each one individually. This can help reduce the number of import statements in our code and make it easier to manage our imports as our application grows in complexity. By using barrel exports, we can also create a clear and organized structure for our codebase, making it easier for developers to navigate and understand the relationships between different parts of the application.
- use hyphenated file names
- each util must be a file, e.g get-file-data, and must do one thing, this will help keep our codebase organized and maintainable, and make it easier to find and reuse code when needed. By following this convention, we can also improve the readability of our code and make it easier for other developers to understand the purpose of each file at a glance. This approach promotes modularity and encourages us to write small, focused functions that can be easily tested and reused throughout the application.

- parts are bigger than components, they can contain multiple components and are responsible for a specific feature or functionality within the application, for instance, we can have a PromptList part that contains multiple PromptItem components and is responsible for rendering the list of prompts in the Prompt Library. This approach allows us to break down our application into smaller, more manageable pieces while still maintaining a clear separation of concerns between different features and functionalities. By organizing our code in this way, we can improve the maintainability and scalability of our application as it grows in complexity.
- components can be in parts!

for instance a landing page can have 3 parts
- header
- sidebar
- content area

each part can have multiple components, for instance, the header can have a logo component, a navigation component, and a user profile component. This approach allows us to break down our application into smaller, more manageable pieces while still maintaining a clear separation of concerns between different features and functionalities. By organizing our code in this way, we can improve the maintainability and scalability of our application as it grows in complexity. etc etc.

Ensure the logo is a component on it's own, this way we can easily reuse it across different parts of the application without having to duplicate code. The logo component can be responsible for rendering the logo image and any associated styling, while the header part can focus on the overall layout and structure of the header section. This separation of concerns allows us to keep our codebase organized and maintainable as our application grows in complexity. By following this approach, we can also improve the reusability of our components and make it easier to manage our code as we add new features and functionalities to the application.

- any external icons library must be in the shared/ui/ folder, and should export * from it, such that we import from shared/ui/icons instead of having to import from the external library directly, this will allow us to easily switch to a different icons library in the future if needed without having to change our imports throughout the application. By centralizing our icons in a single location, we can also improve the maintainability of our codebase and make it easier to manage our dependencies as our application grows in complexity. This approach promotes modularity and encourages us to write reusable components that can be easily tested and maintained over time.


Libraries to use:
- React
- Tanstack Query for data fetching and caching, this will allow us to manage our server state more effectively and improve the performance of our application by caching data and minimizing unnecessary network requests. By using Tanstack Query, we can also simplify our data fetching logic and make it easier to handle loading and error states in our components. This approach promotes a more efficient and scalable way to manage our data as our application grows in complexity.
- Tailwind CSS
- Lucide react for icons + lucide-animated icons (import via proxy from shared/ui/icons)
- Vite
- Typescript
- Meemaw JS : https://www.npmjs.com/package/meemaw Doc here https://github.com/spiderocious/meemaw/blob/main/llms.txt, use utils from this library.
- 