import ErrorBoundary from "./components/ErrorBoundary";
import { PublicRoutes } from "./Routes";
import "./App.css";

const App = () => {
  return (
    <>
      <ErrorBoundary>
        <PublicRoutes />
      </ErrorBoundary>
    </>
  );
};

export default App;
