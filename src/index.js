import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import InfoPage from "./components/InfoPage";
import UsbPage from "./components/UsbPage";
import ChoosePage from "./components/ChoosePage";
import UnSupported from "./components/unsupported";
ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route path="/" exact>
                    <HomePage />
                </Route>
                <Route path="/info">
                    <InfoPage />
                </Route>
                <Route path="/usb">
                    <UsbPage />
                </Route>
                <Route path="/choose">
                    <ChoosePage />
                </Route>
                <Route path="/unsupported">
                    <UnSupported />
                </Route>
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
