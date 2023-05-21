import Hero from "./components/Hero.tsx";

import "./App.css";

const App = () => {
  return (
    <>
      <main>
        <div className="main">
          <div className="gradient" />
        </div>

        <div>
          <Hero />
        </div>
      </main>
    </>
  );
};

export default App;
