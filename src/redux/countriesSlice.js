import { createSlice } from '@reduxjs/toolkit';

const countriesSlice = createSlice({
    name: 'countries',
    initialState: {
        list: [],
    },
    reducers: {
        // Action to set initial countries loaded from API
        setCountries: (state, action) => {
            state.list = action.payload;
        },
        // Action to add a country
        addCountryState: (state, action) => {
            state.list.push(action.payload);
        },
        // Action to edit a country
        editCountryState: (state, action) => {
            const { id, name } = action.payload;
            const country = state.list.find((c) => c.id === id);
            if (country) {
                country.name = name;
            }
        },
        // Action to delete a country
        deleteCountryState: (state, action) => {
            state.list = state.list.filter((c) => c.id !== action.payload);
        },
    },
});

// Export actions for dispatching in components
export const {
    setCountries,
    addCountryState,
    editCountryState,
    deleteCountryState,
} = countriesSlice.actions;

// Export the reducer to use in the store configuration
export default countriesSlice.reducer;
