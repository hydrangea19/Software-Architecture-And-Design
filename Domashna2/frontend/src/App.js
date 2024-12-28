import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import StockExchangePage from './components/Home/StockExchangePage/StockExchangePage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AddIssuer from "./components/Issuers/AddIssuer";
import Issuer from "./components/Issuers/Issuer";
import EditIssuer from "./components/Issuers/EditIssuer";
import IssuerDetails from "./components/Issuers/IssuerDetails";
import DataAnalysisLayout from "./components/Data Analysis/DataAnalysisLayout/DataAnalysisLayout";
import {Reports} from "./components/Reports/Reports";
import ProfilePage from "./components/Profile/ProfilePage";
import LoginForm from "./components/LogIn/LoginForm";
import SignUpForm from "./components/SignUp/SignUpForm";
import DataAnalysis from "./components/Data/DataAnalysis";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<StockExchangePage />} />
          <Route path="/data-analysis" element={<DataAnalysis />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/issuers/" element={<Issuer />} />
          <Route path="/issuers/add/" element={<AddIssuer />} />
          <Route path="/issuers/update/:id/" element={<EditIssuer />} />
          <Route path="/issuers/:id/" element={<IssuerDetails />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
