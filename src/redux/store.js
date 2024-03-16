import { persistStore } from 'redux-persist'
import reducer from "./reducer";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

const middleware = [thunk];

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
);
const persistor = persistStore(store)

export { store, persistor };