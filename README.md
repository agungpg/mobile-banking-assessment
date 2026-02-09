# MobileBankingAssessment

React Native mobile banking assessment project with transaction list, filtering, detail view, and transaction receipt sharing.


## Features

- Transaction list grouped by date (`Today`, `Yesterday`, or formatted date)
- Transaction type filters: `All`, `Money In`, `Money Out`
- Pull-to-refresh and load more pagination
- Transaction detail screen
- Share transaction receipt image from detail screen
- Zustand-based state management for transaction data and filters

## Tech Stack

- React Native `0.83.1`
- React `19.2.0`
- TypeScript
- React Navigation (native stack)
- Zustand

## Project Structure

```text
app/
  assets/
  components/
  constants/
  features/
    transactions/
    transaction-detail/
  navigations/
  screens/
    transactions/
    transaction-detail/
  services/
  stores/
  types/
  utils/
```

## Environment Setup

> **Note**: Complete the official React Native environment setup guide first:  
> https://reactnative.dev/docs/set-up-your-environment

## How To Run The App

## Installation

From project root:

```sh
npm install
bundle install
cd ios && bundle exec pod install && cd ..
```

## Run the App

Start Metro:

```sh
npm start
```

Run Android:

```sh
npm run android
```

Run iOS:

```sh
npm run ios
```

## Scripts

- `npm start` - Start Metro
- `npm run android` - Run Android app
- `npm run ios` - Run iOS app
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests

## Notes

- Mock transaction data: `app/constants/transactions.ts`
- Path aliases: `tsconfig.json` and `babel.config.js`
- Custom fonts linked via: `react-native.config.js`
