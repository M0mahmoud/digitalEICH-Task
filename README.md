# Digital H Task - Product Management Dashboard

A modern, full-featured product management dashboard built with Next.js 15, featuring authentication, CRUD operations, and a beautiful dark-themed UI.

## ⚡ Development Timeline

**⏱️ Total Development Time: 6 Hours**

This comprehensive product management dashboard was built from scratch in just **6 hours**, demonstrating rapid development capabilities and efficient problem-solving skills.

## 🚀 Features

### Product Management

- **Full CRUD Operations**: Create, Read, Update, Delete products
- **Advanced Search**: Debounced search functionality for optimal performance
- **Product Details Modal**: Comprehensive product information display
- **Edit Products**: Modal-based editing with form validation
- **Delete Confirmation**: Safe deletion with confirmation dialogs

### UI/UX Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Tables**: Hover effects, animations, and engaging user interactions
- **Reusable Components**: Modular CategorySelect component for consistency
- **Loading States**: Skeleton loaders and loading indicators
- **Error Handling**: Comprehensive error handling and user feedback

### Technical Features

- **TypeScript**: Full type safety throughout the application
- **Zod Validation**: Schema-based form validation
- **TanStack Query**: Efficient data fetching and caching
- **Server Actions**: Modern Next.js server-side form handling
- **Custom Hooks**: Reusable logic for products and categories

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.4.1, React 19.1.0, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Authentication**: NextAuth.js
- **Data Fetching**: TanStack React Query, Axios
- **Validation**: Zod
- **Icons**: Lucide React
- **State Management**: React Hooks

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/           # NextAuth API routes
│   │   ├── categories/     # Category API endpoints
│   │   └── products/       # Product API endpoints
│   ├── dashboard/
│   │   ├── products/       # Product management pages
│   │   └── layout.tsx      # Dashboard layout
│   └── globals.css         # Global styles
├── components/
│   ├── layout/             # Layout components
│   ├── products/           # Product-specific components
│   │   ├── CreateNewProductForm.tsx
│   │   ├── EditProductForm.tsx
│   │   ├── ProductsTable.tsx
│   │   └── ProductDetailsModal.tsx
│   └── ui/                 # Reusable UI components
│       ├── category-select.tsx
│       └── ... (other UI components)
├── hooks/
│   ├── categories/         # Category-related hooks
│   └── products/           # Product-related hooks
├── lib/
│   ├── apiClient.ts        # API client configuration
│   ├── utils.ts           # Utility functions
│   └── zod-schema/        # Validation schemas
├── provider/
│   └── ClientProvider.tsx  # Query client and session provider
├── types/
│   └── products.ts         # TypeScript type definitions
├── auth.ts                 # NextAuth configuration
├── middleware.ts           # Route protection middleware
└── README.md
```

## 🔧 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd digital-h-task
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:

   ```bash
   NEXT_PUBLIC_API_BASE_URL=https://api.escuelajs.co/api/v1/
   NEXTAUTH_SECRET=your-secret-key-here-make-it-long-and-random
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser

## 📊 Product Management

### Create Products

- Navigate to `/dashboard/products/new`
- Fill in product details (title, price, description)
- Select category using the searchable dropdown
- Submit to create the product

### View Products

- Main products table at `/dashboard/products`
- Search functionality with debounced input
- Pagination for large datasets
- Hover effects and interactive elements

### Edit Products

- Click "Edit" button on any product row
- Modal opens with pre-filled form
- Update any field and save changes
- Real-time validation feedback

### Delete Products

- Click "Delete" button on any product row
- Confirmation dialog prevents accidental deletion
- Successful deletion updates the table immediately

## 🎨 UI Components

### CategorySelect

A reusable component for category selection:

```tsx
<CategorySelect
  label="Select Category"
  value={selectedCategory}
  onValueChange={setSelectedCategory}
  error={validationError}
  disabled={isLoading}
/>
```

### Features

- Searchable dropdown with Command component
- Loading states with skeleton UI
- Error handling and validation
- Fully accessible with keyboard navigation

## 🚀 Performance Optimizations

- **Debounced Search**: Reduces API calls during user typing
- **React Query Caching**: Intelligent data caching and invalidation
- **Lazy Loading**: Components load only when needed
- **Optimized Images**: Next.js Image component for performance
- **Code Splitting**: Automatic code splitting for faster loads

## 🔧 Development

### Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with Next.js rules
- **Prettier**: Code formatting (if configured)

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:

- **Desktop**: Full-featured experience
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Touch-friendly interface with proper sizing

## 🔗 API Integration

### External API

- **Products**: Fake Store API for product data
- **Categories**: Category management with full CRUD
- **Authentication**: Custom implementation with NextAuth

### Error Handling

- Comprehensive error boundaries
- User-friendly error messages
- Retry mechanisms for failed requests
- Loading states for all async operations

## 📄 License

This project is part of a technical assessment and is intended for evaluation purposes.

## 🤝 Contributing

This is a technical assessment project. For any questions or clarifications, please contact the development team.

---

**Built with ❤️ using Next.js 15 and modern React patterns**
