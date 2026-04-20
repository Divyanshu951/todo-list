# React + Vite Todo App

This is a modern, premium-looking Todo application built utilizing a "tastefully historic" dark theme aesthetic. It's built with React, Vite, and styled with Tailwind CSS, leveraging React Query for robust asynchronous state management and `json-server` (or MockAPI) as its backend.

## 🎨 Design Theme & Approach

The UI/UX focuses on a rich, cinematic visual experience:
- **Hero Section:** Features a historic/classic painting background spanning the top ~20% of the viewport covered in a backdrop blur and a dark gradient drop-off.
- **Color Palette & Dark Mode:** Uses deep `stone` and `zinc` tones for a slick, glass-morphism dark mode feeling.
- **Components:** Tasks appear as sleek glass cards with hover lifts, gentle outer glows, and priority-colored tags. 
- **Typography:** Bold tracking on headers ("TODO LIST") and clean sans-serif bodies for a premium app feel.
- **Interactions:** Every button and card has subtle transitions, rotating loaders (`react-spinners`), beautiful custom toasts (`react-hot-toast`), and sleek modal drop-downs.

![Todo App Screenshot](public/screenshot.png)

## 🚀 Tech Stack Highlights

What makes this project stand out from a standard todo list:

- **Frontend Framework:** React 19 + Vite for blazing fast performance.
- **State Management (Server):** `@tanstack/react-query` handles data fetching, caching, background updates, and optimistic UI mutations seamlessly.
- **Styling:** Tailwind CSS v4, utilizing complex util classes for backdrop filters, gradients, and custom shadows.
- **Form Handling:** `react-hook-form` ensures performant, unmanaged form state with built-in validation for the Add Task modal.
- **Alerts/Loaders:** `react-hot-toast` for elegant push notifications on success/error, combined with `react-spinners`.
- **API Mocking:** Built to hook into `json-server` for local dev or external mock APIs for testing.

## 🛠️ How I Implemented It

1. **Setup & Configuration:** Initialized the React skeleton with Vite, installing Tailwind CSS and Tanstack Query. Setup the `QueryClientProvider` at the root.
2. **Theming & Layout:** I stripped out standard App styles and crafted an `AppLayout` around a fixed black/stone color scheme. Added a `Header.jsx` that acts as the "hero banner" using a classic Unsplash painting.
3. **Component Architecture:**
   - `Header`: Static visual component mapping the high-aesthetic hero section.
   - `TodoItem`: Represents a single task card. Connected mutations for deleting and toggling completion.
   - `ModelForm`: A floating, glass-morphism modal to create new tasks, structured cleanly with `react-hook-form`.
4. **Data Layer (`services/useTodo.js`):** Extracted all fetch/mutation logic away from the UI into a dedicated service file. Here I used React Query's `useQuery` and `useMutation` to handle `GET`, `POST`, `PUT`, and `DELETE` requests cleanly while automatically invalidating the `["todos"]` query key to refresh the UI effortlessly when data changes.

## 🏃 Running locally

1. Install dependencies: `npm install`
2. Start the local dev server: `npm run dev`
3. Optional (if you want the local json server running with your `data.json` mock): `npm run server`
