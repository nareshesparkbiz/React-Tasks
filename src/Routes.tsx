import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Register from "./pages/authentication/Register";
import { Login } from "./pages/authentication/Login";
import { AddTransaction } from "./pages/transactions/requests/TransactionForm";
import { ShowTable } from "./pages/transactions/requests/Transactions";
import { ShowTransaction } from "./pages/transactions/requests/TransactionDetails";
import { PageNotFound } from "./components/404Page";

export const PublicRoutes = () => {
  interface finalRouteProps {
    cmp: React.ReactNode;
    isPublic?: boolean;
  }

  const FinalRoute = (props: finalRouteProps): any => {
    const token = document.cookie;
    if (token !== null) {
    }

    const { isPublic, cmp } = props;

    if (isPublic) {
      if (token) {
        return <Navigate to="/all-transaction" />;
      } else {
        return cmp;
      }
    } else {
      if (token) {
        return cmp;
      } else {
        return <Navigate to="/login" />;
      }
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="" element={<Navigate to={"/all-transaction"} />} />
        <Route
          path="/register"
          element={<FinalRoute isPublic cmp={<Register />} />}
        />
        <Route path="login" element={<FinalRoute isPublic cmp={<Login />} />} />

        <Route path="/all-transaction">
          <Route path="" element={<FinalRoute cmp={<ShowTable />} />} />
          <Route
            path="add-transaction"
            element={<FinalRoute cmp={<AddTransaction />} />}
          />
          <Route
            path="view/:id"
            element={<FinalRoute cmp={<ShowTransaction />} />}
          />
          <Route
            path="edit-transaction/:id"
            element={<FinalRoute cmp={<AddTransaction />} />}
          />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};
