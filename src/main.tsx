import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './assets/styles/index.css'
import "antd/dist/reset.css";
import App from './App.tsx'
import './i18n'
import { ThemeProvider } from './context/ThemeContext.tsx'
// import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </Provider>
)