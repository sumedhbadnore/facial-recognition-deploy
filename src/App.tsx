import React from "react";
import WebcamFeed from "./components/WebcamFeed";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="container text-center mt-5">
        <WebcamFeed />
      </div>
    </Provider>
  );
};

export default App;