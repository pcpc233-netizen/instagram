# Tech Spec for AI Agents

## 1. Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **UI Components**: Custom components based on shadcn/ui patterns (Button, Input, Table, Badge)
- **State Management**: React `useState` for local view state (View Switcher)

## 2. File Structure & Key Components

### Core Layout
- **`src/app/layout.tsx`**: Root layout defining the HTML structure and global styles.
- **`src/components/dashboard/sidebar.tsx`**: Implements the "Hub" based navigation (Creative, Ops, Growth). Uses `useState` to toggle hub expansion.

### Dynamic Department Page (The "Super-App" Logic)
- **`src/app/dashboard/work/[department]/page.tsx`**: 
  - This is the recreated **LongtailContentPage** equivalent.
  - **Routing**: Uses a dynamic route parameter `[department]` to determine which data and view to load.
  - **Logic**: 
    - Reads `params.department`.
    - Selects the appropriate Mock Data Generator (e.g., `getDesignData`, `getSourcingData`).
    - Renders the specific View Component based on the department type (Board for Creative, Grid for Ops, List for CS).

### View Components (The "View Switcher" Logic)
The system dynamically switches between these components based on the department context:

1.  **`src/components/dashboard/views/kanban-board.tsx`**
    - **Props**: `data: BoardColumn[]`
    - **Features**: Horizontal scroll, Image rendering, Tag display.
    - **Use Case**: Visual workflows (Design, Marketing).

2.  **`src/components/dashboard/views/dense-grid.tsx`**
    - **Props**: `data: GridRow[]`
    - **Features**: Shadcn Table with tighter padding (`h-10`), numeric alignment, status badges.
    - **Use Case**: Data-heavy workflows (Sourcing, Planning).

3.  **`src/components/dashboard/views/ticket-list.tsx`**
    - **Props**: `data: Ticket[]`
    - **Features**: Flexbox layout, Priority color coding, Issue type badges.
    - **Use Case**: Transactional workflows (CS, Sales).

## 3. Data Structure (Mock Data)
Data is currently mocked within `src/app/dashboard/work/[department]/page.tsx` but structured to simulate a real DB response.

- **Design Data**: Hierarchical (Columns -> Cards). Cards contain `image` URLs and `tags`.
- **Sourcing Data**: Flat array of objects with `sku`, `cost`, `qty`, `deadline`.
- **CS Data**: Flat array with `priority` (High/Medium/Low) and `status` (Open/Resolved).

## 4. Future Improvements
- **Backend Integration**: Replace mock data generators with Supabase/API calls.
- **Drag & Drop**: Implement `dnd-kit` for the Kanban board.
- **Real-time**: Add WebSocket support for ticket updates.
