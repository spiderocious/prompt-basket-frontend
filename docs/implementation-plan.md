# PromptBasket Implementation Plan

## Overview
A React + TypeScript prompt management tool with local storage, feature-sliced design, and easy backend migration path.

---

## 1. Project Setup

### 1.1 Initialize Project
- `npm create vite@latest . -- --template react-ts`
- Install dependencies: `tailwindcss`, `lucide-react` (icons), `clsx` (classnames utility)

### 1.2 Configure Tailwind
- Setup `tailwind.config.js` with custom color palette variables
- Add Quicksand font import to `index.html`
- Create theme configuration in `shared/config/theme.ts` → export color constants for easy palette switching

### 1.3 Project Structure
```
src/
  app/
    App.tsx                    # Root component with routing
    index.tsx                  # Entry point
    layout/
      app-layout.tsx           # Persistent layout wrapper
      sidebar/                 # Navigation sidebar
  features/
    dashboard/                 # Home page with stats
    prompt-library/            # All prompts page (/prompts)
    prompt-editor/             # Create/edit prompt interface
    buckets-page/              # All buckets page (/buckets)
    bucket-detail/             # Single bucket view (/buckets/:id)
    bucket-management/         # Shared bucket CRUD (modals, forms)
  shared/
    ui/                        # Reusable UI components
      icons/                   # Re-export lucide-react icons
      button/
      input/
      modal/
      card/
      search-bar/
      dropdown/
      color-picker/
      icon-picker/
    services/                  # Storage abstraction layer
      storage/                 # Storage adapters
      prompt-service.ts        # Prompt business logic
      bucket-service.ts        # Bucket business logic
    types/                     # Global TypeScript types
    utils/                     # Single-purpose utility functions
    hooks/                     # Shared custom hooks
    config/                    # Theme and app configuration
```

---

## 2. Core Type Definitions

### 2.1 Shared Types (`shared/types/`)
**prompt.ts**
- `Prompt` interface → id, title, content, bucketId, createdAt, updatedAt, tags[]

**bucket.ts**
- `PromptBucket` interface → id, name, color, icon, createdAt

**storage.ts**
- `IStorageAdapter` interface → getPrompts(), savePrompt(prompt), deletePrompt(id), getPromptById(id), searchPrompts(query)
- `IStorageAdapter` interface → getBuckets(), saveBucket(bucket), deleteBucket(id)

---

## 3. Storage Layer (Dependency Injection Ready)

### 3.1 Storage Adapter Interface (`shared/services/storage/`)
**storage-adapter.interface.ts**
- Define `IStorageAdapter` interface with all CRUD methods

**local-storage-adapter.ts**
- Implement `IStorageAdapter` using localStorage
- `getPrompts()` → JSON.parse(localStorage.getItem('prompts') || '[]')
- `savePrompt(prompt)` → Get all, upsert, save back
- `deletePrompt(id)` → Filter out and save
- Same pattern for buckets

**api-storage-adapter.ts** (stub for future)
- Implement `IStorageAdapter` with fetch calls (empty/stub implementation)
- Comment: "Future backend implementation"

### 3.2 Storage Context (`shared/services/storage/`)
**storage-context.tsx**
- Create React context with `IStorageAdapter` instance
- Provider accepts adapter via props (defaults to LocalStorageAdapter)
- `useStorage()` hook → returns adapter from context

---

## 4. Shared Services Layer

### 4.1 Prompt Service (`shared/services/prompt-service.ts`)
- `usePromptService()` hook → wraps storage adapter with business logic
- `getAllPrompts()` → storageAdapter.getPrompts() + sort by updatedAt
- `createPrompt(data)` → generate id, timestamps, call storageAdapter.savePrompt()
- `updatePrompt(id, data)` → get existing, merge, update timestamp
- `deletePrompt(id)` → storageAdapter.deletePrompt()
- `searchPrompts(query)` → filter by title/content/tags match
- `getPromptsByBucket(bucketId)` → filter results

### 4.2 Bucket Service (`shared/services/bucket-service.ts`)
- `useBucketService()` hook → wraps storage adapter
- `getAllBuckets()` → storageAdapter.getBuckets()
- `createBucket(data)` → generate id, call storageAdapter.saveBucket()
- `updateBucket(id, data)` → merge and save
- `deleteBucket(id)` → also handle orphaned prompts (move to "Uncategorized")

---

## 5. Shared UI Components

### 5.1 Basic Components (`shared/ui/`)
**button/button.tsx**
- Props: variant (primary/secondary/ghost), size (sm/md/lg), icon, loading, disabled
- Styled with Tailwind classes using theme colors

**input/input.tsx**
- Props: type, placeholder, icon, error, disabled
- Support for text, textarea variants

**modal/modal.tsx**
- Props: open, onClose, title, children, footer
- Backdrop with fade animation, slide-in modal

**card/card.tsx**
- Props: children, hover, onClick
- Styled container with shadow and hover effects

**search-bar/search-bar.tsx**
- Props: value, onChange, placeholder, onClear
- Input with search icon and clear button

**dropdown/dropdown.tsx**
- Props: options[], value, onChange, placeholder
- Custom styled select component

**icon-picker/icon-picker.tsx**
- Props: value, onChange
- Grid of icon options for bucket customization

**color-picker/color-picker.tsx**
- Props: value, onChange
- Palette of predefined colors

### 5.2 Icons (`shared/ui/icons/index.ts`)
- Re-export all needed icons from lucide-react
- `export { Search, Plus, Edit, Trash, Copy, Folder, Menu, X, ChevronRight } from 'lucide-react'`

---

## 6. Feature: Prompt Library (All Prompts Page - `/prompts`)

### 6.1 Structure (`features/prompt-library/`)
```
hooks/
  use-prompt-library.ts       # Main feature hook
types/
  index.ts                    # Feature-specific types
parts/
  prompt-library-header/      # Search, filters, create button
  prompt-library-grid/        # Grid of prompt cards
components/
  prompt-card/                # Individual prompt display
  empty-state/                # No prompts message
  filter-bar/                 # Bucket filter, sort options
index.tsx                     # Feature entry point
```

### 6.2 Hooks
**use-prompt-library.ts**
- `useState` for searchQuery, selectedBucketFilter, sortOrder
- `useSearchParams()` to sync filters with URL query params
- Use `usePromptService()` to get ALL prompts (regardless of bucket)
- `filteredPrompts` → filter by searchQuery (checks title AND content), then by bucket if filter applied, then sort
- Search is case-insensitive and matches partial strings in both title and content
- Return: prompts, loading, searchQuery, setSearchQuery, bucketFilter, setBucketFilter, sortOrder, setSortOrder, handleDelete, handleCopy

### 6.3 Parts
**prompt-library-header/index.tsx**
- Page title "All Prompts" with total count badge
- SearchBar component (searches both title and content)
- "New Prompt" button → navigate to /prompts/new
- FilterBar component (bucket filter dropdown + sort dropdown)

**filter-bar/index.tsx**
- Bucket filter dropdown: "All Buckets" option + list of available buckets
- Sort dropdown: Newest First, Oldest First, A-Z, Z-A
- Active filter pills with clear button
- Shows count of results

**prompt-library-grid/index.tsx**
- Receives filtered prompts array
- Grid layout (responsive: 1 col mobile, 2 col tablet, 3 col desktop)
- Maps to PromptCard components
- Show EmptyState if no prompts (different messages for no results vs no prompts exist)

### 6.4 Components
**prompt-card/index.tsx**
- Display prompt title (truncated), content preview (3 lines), bucket name, updated date
- Hover: show action buttons (edit, copy, delete)
- Click: open in editor
- Copy button → navigator.clipboard.writeText() + toast notification

**empty-state/index.tsx**
- Icon + message based on context (no prompts, no search results, no prompts in bucket)
- CTA button (create prompt, clear search, etc.)

---

## 7. Feature: Prompt Editor

### 7.1 Structure (`features/prompt-editor/`)
```
hooks/
  use-prompt-editor.ts        # Editor state and logic
parts/
  editor-header/              # Title input, bucket selector, save button
  editor-toolbar/             # Markdown formatting tools
  editor-content/             # Split view: markdown input + preview
components/
  markdown-preview/           # Render markdown content
  editor-actions/             # Save, cancel, delete buttons
index.tsx                     # Feature entry point
```

### 7.2 Hooks
**use-prompt-editor.ts**
- Accept promptId (optional for edit mode)
- `useState` for title, content, selectedBucket, isDirty
- Load prompt on mount if promptId exists
- `handleSave()` → validate, call promptService.createPrompt/updatePrompt, navigate back
- `handleCancel()` → confirm if dirty, navigate back
- Auto-save draft to localStorage every 30s

### 7.3 Parts
**editor-header/index.tsx**
- Title input field
- Bucket dropdown selector
- "Back" button
- Last saved timestamp display

**editor-toolbar/index.tsx**
- Markdown formatting buttons (bold, italic, link, code, list)
- Insert snippets dropdown (common patterns)
- Tab selector (Edit / Preview / Split)

**editor-content/index.tsx**
- Split layout: textarea on left, preview on right
- Responsive: stack vertically on mobile
- Textarea with line numbers (optional)
- Synchronized scroll between edit and preview

### 7.4 Components
**markdown-preview/index.tsx**
- Props: content (markdown string)
- Render HTML with safe markdown parser
- Styled with typography classes

---

## 8. Feature: All Buckets Page (`/buckets`)

### 8.1 Structure (`features/buckets-page/`)
```
hooks/
  use-buckets-page.ts         # Page state and logic
parts/
  buckets-header/             # Title, create button, search
  buckets-grid/               # Grid of bucket cards
components/
  bucket-card/                # Individual bucket display with stats
  empty-buckets-state/        # No buckets message
index.tsx                     # Page entry point
```

### 8.2 Hooks
**use-buckets-page.ts**
- Use `useBucketService()` to get all buckets
- Use `usePromptService()` to count prompts per bucket
- `getBucketStats(bucketId)` → return prompt count, last updated
- Handle navigation to bucket detail page

### 8.3 Parts
**buckets-header/index.tsx**
- Page title "Prompt Buckets" with total count
- "Create Bucket" button → open bucket modal
- Search buckets by name (optional)

**buckets-grid/index.tsx**
- Grid of BucketCard components
- Responsive layout
- Show EmptyBucketsState if no buckets

### 8.4 Components
**bucket-card/index.tsx**
- Display bucket name, color, icon
- Show prompt count badge
- Hover: show edit/delete action buttons
- Click: navigate to `/buckets/:id` to view prompts in that bucket
- Edit button: open bucket modal for editing
- Delete button: show confirmation dialog

---

## 9. Feature: Bucket Detail Page (`/buckets/:id`)

### 9.1 Structure (`features/bucket-detail/`)
```
hooks/
  use-bucket-detail.ts        # Fetch bucket and its prompts
parts/
  bucket-detail-header/       # Bucket info, edit button, back button
  bucket-prompts-grid/        # Prompts in this bucket
index.tsx                     # Page entry point
```

### 9.2 Hooks
**use-bucket-detail.ts**
- Get bucketId from URL params
- Load bucket details from `useBucketService()`
- Load prompts filtered by bucketId from `usePromptService()`
- Handle edit bucket, delete bucket, navigate back

### 9.3 Parts
**bucket-detail-header/index.tsx**
- Back button to /buckets
- Bucket name with icon and color indicator
- Prompt count in this bucket
- Edit bucket button
- Delete bucket button (with confirmation)

**bucket-prompts-grid/index.tsx**
- Same PromptCard component from prompt library
- Grid layout of prompts in this bucket
- Empty state: "No prompts in this bucket yet"
- "Add Prompt" button → create new prompt with this bucket pre-selected

---

## 10. Feature: Prompt Bucket Management (Shared)

### 10.1 Structure (`features/bucket-management/`)
```
hooks/
  use-bucket-management.ts    # Bucket CRUD logic
parts/
  bucket-modal/               # Create/edit bucket modal
components/
  bucket-form/                # Name, color, icon inputs
  bucket-delete-confirm/      # Confirmation dialog
index.tsx                     # Export bucket management
```

### 10.2 Hooks
**use-bucket-management.ts**
- `useState` for modalOpen, editingBucket, deleteConfirmOpen
- Use `useBucketService()` for CRUD operations
- `handleCreateBucket(data)` → validate, save, close modal
- `handleUpdateBucket(id, data)` → save changes
- `handleDeleteBucket(id)` → confirm, delete, handle orphaned prompts (move to "Uncategorized")

### 10.3 Parts
**bucket-modal/index.tsx**
- Modal wrapper containing BucketForm
- Open for create (empty form) or edit (pre-filled)
- Footer with save/cancel buttons

### 10.4 Components
**bucket-form/index.tsx**
- Name input field
- ColorPicker component
- IconPicker component
- Validation: name required, max length

**bucket-delete-confirm/index.tsx**
- Warning message about prompt count in bucket
- Display which prompts will be marked as uncategorized
- Confirm/cancel buttons

---

## 11. App Structure & Routing

### 9.1 Routes (`app/App.tsx`)
- Install and configure `react-router-dom`
- Define routes:
  - `/` → Dashboard/Home page (stats + recent prompts)
  - `/prompts` → All prompts page (full library with search/filter)
  - `/prompts/:id/edit` → Edit specific prompt
  - `/prompts/new` → Create new prompt
  - `/buckets` → All buckets page (manage buckets)
  - `/buckets/:id` → View prompts in specific bucket
- Use BrowserRouter with RouterProvider
- Nested routes for consistent layout (sidebar persists)

### 9.2 Layout Structure (`app/layout/`)
**app-layout.tsx**
- Persistent shell for all routes
- 3-column layout: Sidebar (navigation) | Main Content | (optional right panel)
- Responsive: hamburger menu on mobile, persistent sidebar on desktop
- Sidebar contains: Logo, navigation links (Dashboard, All Prompts, Buckets), bucket quick access

**sidebar/index.tsx**
- Navigation links with active states
- Collapsible bucket list (quick access to bucket filter)
- Mobile: drawer that slides in/out

### 9.3 Dashboard/Home Page (`features/dashboard/`)
**Structure:**
```
features/dashboard/
  hooks/
    use-dashboard-stats.ts   # Calculate stats from prompts
  parts/
    stats-cards/             # Total prompts, buckets count, recent activity
    recent-prompts/          # Last 5-10 edited prompts
  index.tsx
```

**use-dashboard-stats.ts**
- Calculate total prompts count
- Calculate total buckets count
- Get recently updated prompts (last 10)
- Get prompt creation trend (last 7 days)

**stats-cards/index.tsx**
- Grid of stat cards: Total Prompts, Total Buckets, Created This Week
- Click on stat → navigate to relevant page

**recent-prompts/index.tsx**
- List recent prompts with quick actions (edit, copy, view)
- "View All" button → navigate to /prompts

### 11.4 Context Providers (`app/App.tsx`)
- Wrap app in StorageProvider with LocalStorageAdapter
- Optional: ToastProvider for notifications
- Optional: ThemeProvider for dark mode (future)

---

## 12. Utility Functions

### 12.1 Shared Utils (`shared/utils/`)
**generate-id.ts**
- `generateId()` → return crypto.randomUUID() or fallback

**format-date.ts**
- `formatDate(date)` → return "X minutes ago" or formatted date

**truncate-text.ts**
- `truncateText(text, maxLength)` → return truncated with ellipsis

**copy-to-clipboard.ts**
- `copyToClipboard(text)` → use navigator.clipboard API

**validate-prompt.ts**
- `validatePrompt(prompt)` → check required fields, return errors

**search-text.ts**
- `searchText(haystack, needle)` → case-insensitive substring match

**sort-by-date.ts**
- `sortByDate(items, key, order)` → sort array by date field

---

## 13. Styling Strategy

### 13.1 Tailwind Configuration
**tailwind.config.js**
- Extend colors with custom palette
- Add custom animations (fade-in, slide-in, pulse)
- Configure responsive breakpoints

### 13.2 Global Styles (`app/index.css`)
- Import Tailwind directives
- Import Quicksand font
- Define CSS custom properties for colors (for easy palette switching)
- Base typography styles

### 13.3 Component Styling Patterns
- Use Tailwind classes directly in components
- Use `clsx` for conditional classes
- Create shared class constants in `shared/config/styles.ts` for consistency
- Example: `buttonBase`, `cardBase`, `inputBase`

---

## 14. Animations & Interactions

### 14.1 Micro-interactions
- Button hover: scale up slightly (transform scale-105)
- Card hover: shadow elevation + subtle border color
- Modal: backdrop fade-in + content slide-up
- Toast notifications: slide-in from top-right

### 14.2 Animated Icons
- Use lucide-react's built-in animations where available
- Add custom keyframe animations for: loading spinners, success checkmarks, delete confirmation

### 14.3 Transitions
- Page view changes: crossfade effect
- List updates: stagger animation for new items
- Search results: fade-in results

---

## 15. Accessibility

### 15.1 Keyboard Navigation
- All interactive elements reachable via Tab
- Escape key closes modals
- Enter key submits forms
- Arrow keys navigate lists/grids

### 15.2 ARIA Attributes
- Semantic HTML (button, nav, main, aside)
- ARIA labels for icon-only buttons
- ARIA-live regions for dynamic content updates
- Focus management (trap focus in modals)

### 15.3 Screen Reader Support
- Alt text for icons
- Descriptive button labels
- Form labels properly associated
- Skip navigation link

---

## 16. Implementation Order

### Phase 1: Foundation (Day 1-2)
1. Project setup with Vite + React + TypeScript
2. Install and configure Tailwind CSS + theme colors
3. Install react-router-dom
4. Shared types definitions (Prompt, Bucket, Storage interfaces)
5. Storage adapter interface + LocalStorage implementation
6. Storage context + provider
7. Shared UI components (Button, Input, Card, Modal, SearchBar)
8. Icon exports setup (re-export lucide-react)
9. Utility functions (format-date, truncate-text, etc.)

### Phase 2: Core Services & Layout (Day 2-3)
10. Prompt service hook (usePromptService)
11. Bucket service hook (useBucketService)
12. App routing setup with react-router-dom
13. App layout component (persistent sidebar + main content)
14. Sidebar component (navigation links + logo)
15. Mobile responsive menu/drawer

### Phase 3: Dashboard/Home Page (Day 3-4)
16. Dashboard feature structure
17. use-dashboard-stats hook
18. Stats cards component (total prompts, buckets, recent activity)
19. Recent prompts list component
20. Wire up dashboard route (/)

### Phase 4: All Prompts Page (Day 4-6)
21. Prompt library feature structure
22. use-prompt-library hook (with search, filter, sort)
23. Prompt library header (search bar, create button)
24. Filter bar component (bucket filter + sort)
25. Prompt library grid
26. Prompt card component (with actions: edit, copy, delete)
27. Empty states (no prompts, no search results)
28. Wire up /prompts route

### Phase 5: Bucket Management (Day 6-7)
29. Bucket management feature (shared)
30. use-bucket-management hook
31. Bucket modal component
32. Bucket form (name, color picker, icon picker)
33. Color picker component
34. Icon picker component
35. Bucket delete confirmation dialog
36. All Buckets page (/buckets)
37. Bucket card component with stats
38. Bucket detail page (/buckets/:id)

### Phase 6: Prompt Editor (Day 7-9)
39. Prompt editor feature structure
40. use-prompt-editor hook
41. Editor header (title input, bucket selector)
42. Editor toolbar (markdown formatting)
43. Editor content (split view: edit + preview)
44. Markdown preview component
45. Auto-save functionality
46. Wire up editor routes (/prompts/new, /prompts/:id/edit)

### Phase 7: Polish & Features (Day 9-11)
47. Toast notification system
48. Copy to clipboard functionality with feedback
49. Search implementation (title + content search)
50. URL query params for filters
51. Add all animations + transitions
52. Loading states for all async operations
53. Error handling + error boundaries

### Phase 8: Final Polish (Day 11-12)
54. Responsive design testing + fixes (mobile, tablet, desktop)
55. Accessibility audit + fixes (keyboard nav, ARIA, screen readers)
56. Performance optimizations (debounce search, memoization)
57. Initial data seeding (sample prompts + buckets)
58. Cross-browser testing
59. Final UX refinements

---

## 17. Testing Considerations

### Manual Testing Checklist
- Create/edit/delete prompts ✓
- Create/edit/delete buckets ✓
- Search and filter prompts ✓
- Copy prompt to clipboard ✓
- Markdown rendering ✓
- Auto-save in editor ✓
- Orphaned prompts handling ✓
- LocalStorage persistence ✓
- Responsive breakpoints ✓
- Keyboard navigation ✓
- Screen reader compatibility ✓

---

## 18. Future Backend Migration

### When Adding Backend
1. Create `api-storage-adapter.ts` implementing `IStorageAdapter`
2. Configure API base URL in environment variables
3. Update App.tsx to instantiate ApiStorageAdapter instead
4. No changes needed in services or features (dependency injection FTW!)
5. Add authentication context if needed
6. Handle loading states + error states from API

### API Endpoints Needed
- `GET /prompts` → return all prompts
- `POST /prompts` → create prompt
- `PUT /prompts/:id` → update prompt
- `DELETE /prompts/:id` → delete prompt
- `GET /buckets` → return all buckets
- `POST /buckets` → create bucket
- `PUT /buckets/:id` → update bucket
- `DELETE /buckets/:id` → delete bucket

---

## 19. Performance Optimizations

- Debounce search input (300ms)
- Virtualize long prompt lists (if >100 items)
- Lazy load editor markdown preview
- Memoize filtered/sorted prompt calculations
- Throttle auto-save (max once per 30s)

---

## Key Principles Summary

✅ Feature-sliced design: features/ + shared/
✅ Single-responsibility utilities (one function per file)
✅ Barrel exports for clean imports
✅ Parts (layout) vs Components (reusable)
✅ Dependency injection for storage layer
✅ React hooks for state + logic
✅ No global state management
✅ Tailwind for all styling
✅ LocalStorage with future API migration path
✅ Accessibility first
✅ Animated, delightful UX

---

## Success Criteria

- User can manage 100+ prompts efficiently
- Zero backend dependency initially
- Can switch to API backend with minimal code changes (<10 lines)
- Fully keyboard accessible
- Works smoothly on mobile + desktop
- Clean, maintainable codebase following all conventions
- Visually polished with smooth animations
- Fast: <100ms interaction response time
