import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";

import Topbar from "./pages/global/Topbar";


import Dashboard from "./pages/dashboard";
import Team from "./pages/team";
import Invoices from "./pages/invoices";
import Contacts from "./pages/contacts";
import Form from "./pages/form";
import Calendar from "./pages/calendar";
import Bar from "./pages/bar";
import Line from "./pages/line";
import Pie from "./pages/pie";
import FAQ from "./pages/faq";
import Geography from "./pages/geography";

import DashboardF from "./FinanceManager/pages/dashboardF";
import TeamF from "./FinanceManager/pages/team";
import InvoicesF from "./FinanceManager/pages/invoices";
import ContactsF from "./FinanceManager/pages/contactsF";
import FormF from "./FinanceManager/pages/form";
import CalendarF from "./FinanceManager/pages/calendarF";
import BarF from "./FinanceManager/pages/barF";
import LineF from "./FinanceManager/pages/line";
import PieF from "./FinanceManager/pages/pie";
import FAQF from "./FinanceManager/pages/faq";
import GeographyF from "./FinanceManager/pages/geography";

import DashboardL from "./LivraisonManager/pages/dashboardL";
import TeamL from "./LivraisonManager/pages/team";
import InvoicesL from "./LivraisonManager/pages/invoices";
import ContactsL from "./LivraisonManager/pages/contactsL";
import FormL from "./LivraisonManager/pages/form";
import CalendarL from "./LivraisonManager/pages/calendarL";
import BarL from "./LivraisonManager/pages/barL";
import LineL from "./LivraisonManager/pages/line";
import PieL from "./LivraisonManager/pages/pie";
import FAQL from "./LivraisonManager/pages/faq";
import GeographyL from "./LivraisonManager/pages/geography";
import Demande from "./pages/Demande"

const App = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
                <Route path="/Dem" element={<Demande />} />

                <Route path="/dashF" element={<DashboardF />} />
                <Route path="/teamF" element={<TeamF/>} />
                <Route path="/contactsF" element={<ContactsF />} />
                <Route path="/invoicesF" element={<InvoicesF/>} />
                <Route path="/formF" element={<FormF />} />
                <Route path="/barF" element={<BarF/>} />
                <Route path="/pieF" element={<PieF />} />
                <Route path="/lineF" element={<LineF />} />
                <Route path="/faqF" element={<FAQF />} />
                <Route path="/calendarF" element={<CalendarF />} />
                <Route path="/geographyF" element={<GeographyF />} />

                <Route path="/dashL" element={<DashboardL />} />
                <Route path="/teamL" element={<TeamL/>} />
                <Route path="/contactsL" element={<ContactsL />} />
                <Route path="/invoicesL" element={<InvoicesL/>} />
                <Route path="/formL" element={<FormL />} />
                <Route path="/barL" element={<BarL/>} />
                <Route path="/pieL" element={<PieL />} />
                <Route path="/lineL" element={<LineL />} />
                <Route path="/faqL" element={<FAQL />} />
                <Route path="/calendarL" element={<CalendarL />} />
                <Route path="/geographyL" element={<GeographyL />} />
              </Routes>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
