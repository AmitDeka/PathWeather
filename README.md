# PathWeather

PathWeather is a Next.js-based web application that allows users to check the weather conditions along their travel routes. Users can plan trips, add stops, and schedule future trips with accurate weather forecasts.

## Features

- **Route Weather Check**: Enter start, destination, and optional stops to get weather details for the full trip.
- **Live Weather Data**: Fetches real-time weather information for each point in the route.
- **Schedule Trips**: Option to set a future date and time for the trip (up to 15 days from today). Past dates and times are disabled.
- **Interactive Map**: Visual representation of your route using dynamic map components.
- **Shareable URL**: Share trip details via URL so others can open and view the same route instantly.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui
- **Maps**: Leaflet.js (React Leaflet)
- **APIs**: OpenWeather API for weather data

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (>= 18)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/pathweather.git
   cd pathweather
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your OpenWeather API key:

   ```bash
   NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

## Future Enhancements

- User authentication for saved trips
- Push notifications for weather alerts on saved routes
- Offline support with service workers
- Dark mode support

## License

This project is licensed under the MIT License.
