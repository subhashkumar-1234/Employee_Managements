import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from './countriesSlice';

export const store = configureStore({
    reducer: {
        countries: countriesReducer,
        // Add other slice reducers here as you migrate them (e.g. languages: languagesReducer)
    },
});

// Dev helper: console logs every state change in Redux
store.subscribe(() => {
    console.log('🔔 Redux State Updated:', store.getState());
});

