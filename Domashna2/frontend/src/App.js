import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddIssuer from "./components/Issuers/AddIssuer";
import Issuer from "./components/Issuers/Issuer";
import EditIssuer from "./components/Issuers/EditIssuer";
import IssuerDetails from "./components/Issuers/IssuerDetails";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/issuers/" element={<Issuer />} />
        <Route path="/issuers/add/" element={<AddIssuer />} />
        <Route path="issuers/update/:id/" element={<EditIssuer />} />
        <Route path="issuers/:id/" element={<IssuerDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
