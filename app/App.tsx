import React from 'react';
import { MainPage, ProductDetails } from './components/pages';
import { AppTheme, lightTheme } from './theme';

const App = () => (
    <AppTheme.Provider value={lightTheme}>
        <MainPage />
        {/* <ProductDetails /> */}
    </AppTheme.Provider>
);

export default App;
