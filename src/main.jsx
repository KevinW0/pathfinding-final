import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { targetStartReducer } from './redux_store';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(targetStartReducer, {
    isStartSelected: false,
    isTargetSelected: false,
    startCoords: { x: -1, y: -1 },
    targetCoords: { x: -1, y: -1 },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
);
