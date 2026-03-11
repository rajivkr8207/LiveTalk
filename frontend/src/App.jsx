import AppRoutes from "./routes/AppRouter";
import { Provider } from "react-redux";
import { store } from "./stores/store";

const App = () => {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
};

export default App;
