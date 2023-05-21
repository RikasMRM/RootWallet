import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import HomePage from "./pages/HomePage.tsx";

import "./App.css";

const App = () => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <main>
          <div>
            <HomePage />
          </div>
        </main>
      </LocalizationProvider>
    </>
  );
};

export default App;
