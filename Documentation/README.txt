==================================
Tourific Application Documentation
==================================

1. Project Overview
-------------------
Tourific is a modern, AI-powered web application designed to simplify travel planning. It allows users to generate personalized tour itineraries based on their preferences, such as budget, duration, location, and travel style. The application uses Google's Gemini AI (via Genkit) to create detailed, day-by-day travel plans, suggest flights, and offer alternative activities.

2. Technology Stack
-------------------
- Framework: Next.js (with App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- UI Components: ShadCN UI
- AI Integration: Genkit (for Google Gemini)
- Database & Auth: Firebase (Firestore, Firebase Authentication)
- Form Management: React Hook Form with Zod for validation
- Icons: Lucide React
- Charts: Recharts

3. Core Features
----------------
- AI Itinerary Generation: Users can input their travel preferences to receive a complete, day-by-day itinerary.
- Popular Itineraries: A curated section of pre-defined popular travel plans that users can explore with a single click.
- Flight Suggestions: After an itinerary is generated, users can fetch realistic, sample flight options for their destination.
- AI-Powered Alternatives: Users can request alternative suggestions for activities, restaurants, or hotels within their generated itinerary.
- PDF Download: Itineraries can be downloaded as a beautifully formatted PDF for offline use.
- Admin Dashboard: A secure admin panel that provides user analytics, such as daily visit counts, with charts and statistics. It also includes instructions for securely managing the Gemini API key.
- Responsive Design: The application is fully responsive and works seamlessly across desktops, tablets, and mobile devices.

4. File Structure
-----------------
/
|-- src/
|   |-- app/                # Next.js pages and routes
|   |   |-- admin/          # Admin panel routes
|   |   |-- api/            # API routes (if any)
|   |   |-- (main pages)/   # about, contact, itinerary, etc.
|   |   |-- layout.tsx      # Root layout
|   |   `-- page.tsx        # Home page
|   |
|   |-- ai/                 # Genkit AI integration
|   |   |-- flows/          # AI flows for specific tasks (e.g., generate itinerary)
|   |   `-- genkit.ts       # Genkit configuration
|   |
|   |-- components/         # Reusable React components
|   |   |-- ui/             # ShadCN UI components
|   |   `-- (custom)/       # Custom components (e.g., header, footer, itinerary-form)
|   |
|   |-- firebase/           # Firebase configuration and custom hooks
|   |   |-- firestore/      # Firestore-specific hooks (useCollection, useDoc)
|   |   |-- config.ts       # Firebase project configuration
|   |   `-- index.ts        # Firebase initialization and service exports
|   |
|   |-- hooks/              # Custom React hooks (e.g., use-toast)
|   |
|   |-- lib/                # Libraries, helpers, and schemas
|   |   |-- services/       # Business logic services
|   |   |-- placeholder-images.json # Data for placeholder images
|   |   |-- schema.ts       # Zod schemas for form validation
|   |   `-- utils.ts        # Utility functions (e.g., cn for Tailwind)
|   |
|   `-- middleware.ts       # Next.js middleware for route protection (admin panel)
|
|-- public/                 # Static assets
|-- firestore.rules         # Firestore security rules
|-- package.json            # Project dependencies and scripts
`-- tailwind.config.ts      # Tailwind CSS configuration

5. Setup and Local Development
------------------------------
### Prerequisites
- Node.js (v18 or later)
- npm, yarn, or pnpm

### Installation
Clone the repository and install the dependencies:
npm install

### Environment Variables
The application requires a Google Gemini API key to power its AI features. You must set this key as an environment variable in your hosting environment.

For local development, create a `.env` file in the root of the project and add your key:
GEMINI_API_KEY=your_gemini_api_key_here

### Running the Development Server
Start the Next.js development server:
npm run dev

The application will be available at http://localhost:9002.

6. Admin Panel Access
---------------------
The application includes an admin panel for viewing site analytics. You can access it by navigating to `/admin`.

- Username: admin
- Password: password

Note: These credentials are hardcoded for demonstration purposes. In a production environment, you should implement a secure and robust authentication system for administrative access.
