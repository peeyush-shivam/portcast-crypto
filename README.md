# CryptoMark

CryptoMark is a comprehensive cryptocurrency tracking application built with React and Redux. It allows users to view cryptocurrency details, convert currency, and manage favorite cryptocurrencies with data persistence across sessions.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [License](#license)

## Features

- View details of various cryptocurrencies.
- Real-time price updates using WebSockets.
- Currency conversion.
- Manage favorite cryptocurrencies with persistence across sessions using `localStorage`.
- Responsive design.

## Technologies

- Frontend:
    - React
    - Redux Toolkit
    - TypeScript
    - React Router
    - Tailwind CSS
- APIs:
    - CoinCap API
- WebSockets:
    - CoinCap WebSocket for real-time price updates

## Installation

1. Clone the repository:

```bash
git clone https://github.com/peeyush_shivam/crypto-dashboard.git
cd crypto-dashboard
```
2. Installing dependencies
```bash
npm install
```
3. Start the development Server
```
npm run dev
```
4. Open your browser and navigate to http://localhost:3000.

## Usage

### Fetching Cryptocurrencies
The application fetches cryptocurrency data from the CoinCap API at regular intervals to keep the data updated. This is handled in the LandingPage component.

### Viewing Cryptocurrency Details
Clicking on a cryptocurrency from the list navigates to a detailed view, which displays current price, market cap, volume, and supply information. Real-time price updates are handled via WebSocket.

### Managing Favorites 
Users can add or remove cryptocurrencies from their favorites list. The count of favorites is displayed in the navbar.

## API Reference
### CoinCap API
- Base URL: https://api.coincap.io/v2
- Endpoints:
    - /assets: Fetch a list of all cryptocurrencies.
    - /assets/{id}: Fetch details of a specific cryptocurrency.
- WebSocket
    - URL: wss://ws.coincap.io/prices?assets={id}
    - Description: Provides real-time price updates for specified cryptocurrencies.

## Contributing
We welcome contributions to improve CryptoMark! To contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature-name).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some feature').
5. Push to the branch (git push origin feature/your-feature-name).
6. Create a new Pull Request.

### Happy coding!











