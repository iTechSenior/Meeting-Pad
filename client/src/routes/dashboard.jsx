// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UploadDoc from "views/upload-file/UploadDoc.jsx";
import AditionalInfo from "views/aditional-info/aditional-info.jsx";
import ApprovedDoc from "views/approved-doc/approved-doc.jsx";
import RejectedDoc from "views/rejected-doc/rejected-doc.jsx";
import Poll from "views/poll/poll.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";
import Login from "../views/Login/login";
import MeetingRoom from "../views/meeting-room/meeting-room";

// cvoro
import dashboard from '../assets/img/dashboard.png'
import uploaddoc from '../assets/img/uploaddocs.png'
import approveddoc from '../assets/img/approveddocs.png'
import chat from '../assets/img/chat.png'
import infodoc from '../assets/img/infodocs.png'
import newdoc from '../assets/img/newdocs.png'
import rejectedoc from '../assets/img/rejecteddocs.png'
import poll from '../assets/img/poll.png'
import newDocuments from "../views/new documents/newDocuments";


const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "",
    icon: dashboard,
    component: DashboardPage
  },
  {
    path: "/upload-doc",
    sidebarName: "Upload document",
    navbarName: "",
    icon: uploaddoc,
    component: UploadDoc
  },
  {
    path: "/newdocuments",
    sidebarName: "New documents",
    navbarName: "",
    icon: newdoc,
    component: newDocuments
  },
  {
    path: "/additionalinfo",
    sidebarName: "Aditional info",
    navbarName: "",
    icon: infodoc,
    component: AditionalInfo
  },
  {
    path: "/approveddoc",
    sidebarName: "Approved doc",
    navbarName: "",
    icon: approveddoc,
    component: ApprovedDoc
  },
  {
    path: "/rejecteddoc",
    sidebarName: "Rejected doc",
    navbarName: "",
    icon: rejectedoc,
    component: RejectedDoc
  },
  {
    path: "/poll",
    sidebarName: "Poll",
    navbarName: "",
    icon: poll,
    component: Poll
  },
  {
    path: "/login",
    sidebarName: "Login",
    navbarName: "",
    icon: LocationOn,
    component: Login
  },
  {
    path: "/meetingroom",
    sidebarName: "Meeting room",
    navbarName: "",
    icon: chat,
    component: MeetingRoom
  },
  // {
  //   path: "/notifications",
  //   sidebarName: "Notifications",
  //   navbarName: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   sidebarName: "Upgrade To PRO",
  //   navbarName: "Upgrade To PRO",
  //   icon: Unarchive,
  //   component: UpgradeToPro
  // },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
