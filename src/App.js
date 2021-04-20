import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import RootContext from "./context/RootContext";
import ProtectedRoute from "./hoc/ProtectedRoute";
import Login from "./container/Login";
import Forget from "./container/Forget";
import Verification from "./container/Verification";
import ForgetEmail from "./container/ForgetEmail";
import Dashboard from "./container/Dashboard";
import Codes from "./container/Dashboard/CodeDashboard";
import Denails from "./container/Denails/Denails";
import BioSimilar from "./container/Dashboard/BioSimilars";
import DashboardAnalysis from "./container/Dashboard/DashboardAnalysis";
import Users from "./container/Users";
import Claim835 from "./container/Claim835";
import SearchClaims from "./container/SearchClaims";
import Register from "./container/Register";
import Claim835Detail from "./container/Claim835Detail";
import Logout from "./container/Logout";
import Layout from "./hoc/Layout/index";
import Subscription from "./container/Subscription";
import ServiceLine from "./container/ServiceLine";
import Health from "./container/Health";
import Profile from "./container/Users/Profile";
import NotificationSend from "./container/Notifications/Send";
import DrSiderbar from "./components/DrServices";
import DrServices from "./components/DrServices";
import Upload from "./container/Upload";
import MessageCenter from "./container/Health-cop/MessageCenter";
import { ThemeProvider } from "@material-ui/styles";
import Theme from "./theme";
import ServerPagination from "./container/ServerPagination";
import DeleteClaim from "./container/DeleteClaim";
import Claim837 from "./container/Claim837";
import Claim837Detail from "./container/Claim837Detail";
import ErrorCode from "./container/ClaimErrorCode";
import Error from "./container/ClaimErrors";
import LicenseManagement from "./container/LicenseManagement/index";
import Claim277 from "./container/Claim277";
import CodeManagement from "./container/CodeManagement/index";
import CustomerListing from "./container/Customers/CustomerListing";
import SubscriptionRestPassword from "./container/SubscriptionResetPassword";
import Report from "./container/Report";
import ReportsMain from "./container/Report/ReportsDefault";
import DenialXplorer from "./container/Report/DenialXplorer";
import DrugReport from "./container/Report/Drugs";
import PatientDetail from "./container/PatientDetail";
// import TabsDashboard from "./container/Dashboard/TabsDashboard";
import DataSources from "./container/DataSources";
import SearchResult from "./container/Search";
import RCA from "./container/Dashboard/RCA";
import Rules from "./container/rules";
import ReportRejection from "./container/RejectionReport";
import TimeLine from "./container/PatientDetail/TimeLine";
import RCADetails from "./container/Dashboard/RCA/RCADetail";
import Error404 from "./container/ErrorPages/Error404";
import Error500 from "./container/ErrorPages/Error500";
import NevoCharts from "./container/Dashboard/NevoCharts";
import Biosimilars from "./container/biosimilars";
import DenailsCPT from "./container/Denails/DenailsCPT";
import DenailsPayer from "./container/Denails/DenailsPayer";
import DenailsReasonCode from "./container/Denails/DenailsReasonCode";
import ChatBot from "./container/ChatBot";
import TopNavLayout from "./container/TopNavLayout/index.js";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <RootContext>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login}>
              <Login />
            </Route>
            <Route exact path="/forget-password">
              <Forget />
            </Route>
            <Route exact path="/email-verification/:email/:verificationCode">
              <Verification fullwidth />
            </Route>
            <Route exact path="/user/changePassword/:autCode">
              <ForgetEmail />
            </Route>
            <Route exact path="/logout">
              <Logout />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/404">
              <Error404 />
            </Route>
            <Route exact path="/500">
              <Error500 />
            </Route>
            <Route exact path="/top-nav">
              <TopNavLayout />
            </Route>

            {/* </div> */}
            <Layout>
              <ProtectedRoute
                exact
                permissions={[
                  "admin",
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                  "e005c454-f8a8-4329-a32a-2527142995a7",
                  "c51eec55-3c3b-47d6-a13d-0fc6c263ac96",
                ]}
                path="/"
              >
                <Dashboard></Dashboard>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={[
                  "admin",
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                  "e005c454-f8a8-4329-a32a-2527142995a7",
                  "c51eec55-3c3b-47d6-a13d-0fc6c263ac96",
                ]}
                path="/nevo-charts"
              >
                <NevoCharts></NevoCharts>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={[
                  "admin",
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                  "e005c454-f8a8-4329-a32a-2527142995a7",
                  "c51eec55-3c3b-47d6-a13d-0fc6c263ac96",
                ]}
                path="/Chatbot"
              >
                <ChatBot></ChatBot>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={[
                  "admin",
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                  "e005c454-f8a8-4329-a32a-2527142995a7",
                  "c51eec55-3c3b-47d6-a13d-0fc6c263ac96",
                ]}
                path="/codes"
              >
                <Codes></Codes>
              </ProtectedRoute>

              <ProtectedRoute
                exact
                permissions={[
                  "admin",
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                  "e005c454-f8a8-4329-a32a-2527142995a7",
                  "c51eec55-3c3b-47d6-a13d-0fc6c263ac96",
                ]}
                path="/biosimilar"
              >
                <BioSimilar></BioSimilar>
              </ProtectedRoute>

              <ProtectedRoute
                exact
                permissions={[
                  "admin",
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                  "e005c454-f8a8-4329-a32a-2527142995a7",
                  "c51eec55-3c3b-47d6-a13d-0fc6c263ac96",
                ]}
                path="/denials"
              >
                <Denails></Denails>
              </ProtectedRoute>

              <ProtectedRoute
                exact
                permissions={[
                  "admin",
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                  "e005c454-f8a8-4329-a32a-2527142995a7",
                  "c51eec55-3c3b-47d6-a13d-0fc6c263ac96",
                ]}
                path="/analysis"
              >
                <DashboardAnalysis></DashboardAnalysis>
              </ProtectedRoute>

              <ProtectedRoute
                exact
                permissions={[
                  "admin",
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                  "c51eec55-3c3b-47d6-a13d-0fc6c263ac96",
                ]}
                path="/workers"
              >
                <Claim837></Claim837>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={[
                  "admin",
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                  "c51eec55-3c3b-47d6-a13d-0fc6c263ac96",
                ]}
                path="/report"
              >
                <Report></Report>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={[
                  "admin",
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                  "c51eec55-3c3b-47d6-a13d-0fc6c263ac96",
                ]}
                path="/reports-main"
              >
                <ReportsMain></ReportsMain>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={[
                  "admin",
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                  "c51eec55-3c3b-47d6-a13d-0fc6c263ac96",
                ]}
                path="/denial-xplorer"
              >
                <DenialXplorer></DenialXplorer>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={[
                  "admin",
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                  "c51eec55-3c3b-47d6-a13d-0fc6c263ac96",
                ]}
                path="/drug-report"
              >
                <DrugReport></DrugReport>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={[
                  "admin",
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                  "c51eec55-3c3b-47d6-a13d-0fc6c263ac96",
                ]}
                path="/denails-cpt"
              >
                <DenailsCPT></DenailsCPT>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={[
                  "admin",
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                  "c51eec55-3c3b-47d6-a13d-0fc6c263ac96",
                ]}
                path="/denails-reason-code"
              >
                <DenailsReasonCode></DenailsReasonCode>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={[
                  "admin",
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                  "c51eec55-3c3b-47d6-a13d-0fc6c263ac96",
                ]}
                path="/denails-payer"
              >
                <DenailsPayer></DenailsPayer>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={[
                  "admin",
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                  "c51eec55-3c3b-47d6-a13d-0fc6c263ac96",
                ]}
                path="/patient-details/:id"
              >
                <PatientDetail></PatientDetail>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={[
                  "admin",
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                  "c51eec55-3c3b-47d6-a13d-0fc6c263ac96",
                ]}
                path="/report-rejection"
              >
                <ReportRejection></ReportRejection>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={[
                  "admin",
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                  "c51eec55-3c3b-47d6-a13d-0fc6c263ac96",
                ]}
                path="/pre-adjudication-detail/:id"
              >
                <Claim837Detail></Claim837Detail>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={[
                  "admin",
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                  "c51eec55-3c3b-47d6-a13d-0fc6c263ac96",
                ]}
                path="/claim277/:id/:requestId"
              >
                <Claim277></Claim277>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={[
                  "admin",
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                ]}
                path="/error-code"
              >
                <ErrorCode></ErrorCode>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={[
                  "admin",
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                ]}
                path="/error"
              >
                <Error></Error>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={[
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                  "c51eec55-3c3b-47d6-a13d-0fc6c263ac96",
                ]}
                path="/users"
              >
                <Users></Users>
              </ProtectedRoute>
              <Route
                exact
                permissions={[
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "e005c454-f8a8-4329-a32a-2527142995a7",
                ]}
                path="/customers"
              >
                <CustomerListing></CustomerListing>
              </Route>

              <ProtectedRoute
                exact
                permissions={[
                  "admin",
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                ]}
                path="/subscription"
              >
                <Subscription></Subscription>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={[
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "e005c454-f8a8-4329-a32a-2527142995a7",
                ]}
                path="/support"
              >
                <Health></Health>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={[
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "e005c454-f8a8-4329-a32a-2527142995a7",
                ]}
                path="/data-sources"
              >
                <DataSources></DataSources>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={[
                  "admin",
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                  "c51eec55-3c3b-47d6-a13d-0fc6c263ac96",
                ]}
                path="/claim"
              >
                <Claim835></Claim835>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={[
                  "admin",
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                  "c51eec55-3c3b-47d6-a13d-0fc6c263ac96",
                ]}
                path="/searh-claims"
              >
                <SearchClaims></SearchClaims>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={[
                  "admin",
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                  "c51eec55-3c3b-47d6-a13d-0fc6c263ac96",
                ]}
                path="/claim-detail/:id"
              >
                <Claim835Detail></Claim835Detail>
              </ProtectedRoute>
              <ProtectedRoute exact path="/service-line">
                <ServiceLine></ServiceLine>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={[
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "e005c454-f8a8-4329-a32a-2527142995a7",
                ]}
                path="/message-center"
              >
                <MessageCenter></MessageCenter>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={[
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "e005c454-f8a8-4329-a32a-2527142995a7",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                ]}
                path="/profile"
              >
                <Profile></Profile>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={[
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "e005c454-f8a8-4329-a32a-2527142995a7",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                ]}
                path="/send-notification"
              >
                <NotificationSend></NotificationSend>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={[
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "e005c454-f8a8-4329-a32a-2527142995a7",
                ]}
                path="/lincense-management"
              >
                <LicenseManagement></LicenseManagement>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={[
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "e005c454-f8a8-4329-a32a-2527142995a7",
                ]}
                path="/code-management"
              >
                <CodeManagement></CodeManagement>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={["e005c454-f8a8-4329-a32a-2527142995a7"]}
                path="/dr-services"
              >
                <DrServices></DrServices>
              </ProtectedRoute>
              <ProtectedRoute path="/dr-service-sidebar">
                <DrSiderbar></DrSiderbar>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={["c5a99825-8da0-4ebe-adbc-e15a775d5049"]}
                path="/uploads"
              >
                <Upload></Upload>
                {/* <MessageCenter></MessageCenter> */}
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={["c5a99825-8da0-4ebe-adbc-e15a775d5049"]}
                path="/server-pagination"
              >
                <ServerPagination></ServerPagination>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={["c5a99825-8da0-4ebe-adbc-e15a775d5049"]}
                path="/delete-claim"
              >
                <DeleteClaim></DeleteClaim>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={["c5a99825-8da0-4ebe-adbc-e15a775d5049"]}
                path="/reset-password"
              >
                <SubscriptionRestPassword></SubscriptionRestPassword>
              </ProtectedRoute>
              <ProtectedRoute
                exact
                permissions={[
                  "5a3c68a8-5035-4798-b209-d06f7f8aae24",
                  "c5a99825-8da0-4ebe-adbc-e15a775d5049",
                  "c51eec55-3c3b-47d6-a13d-0fc6c263ac96",
                ]}
                path="/biosimilars"
              >
                <Biosimilars></Biosimilars>
              </ProtectedRoute>
              <ProtectedRoute exact path="/search-results">
                <SearchResult></SearchResult>
              </ProtectedRoute>
              <ProtectedRoute exact path="/rca">
                <RCA></RCA>
              </ProtectedRoute>
              <ProtectedRoute exact path="/rules">
                <Rules></Rules>
              </ProtectedRoute>
              <ProtectedRoute exact path="/time-line/:PCN">
                <TimeLine></TimeLine>
              </ProtectedRoute>
              <ProtectedRoute exact path="/rca-details/:name">
                <RCADetails></RCADetails>
              </ProtectedRoute>
              {/* <ProtectedRoute path="*" exact={true}>
                <Error404></Error404>
              </ProtectedRoute> */}
            </Layout>
            <Route path="*" exact>
              <Error404 />
            </Route>
          </Switch>
        </BrowserRouter>
      </RootContext>
    </ThemeProvider>
  );
}

export default App;
