import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./Components/NavigasiBar/Nav";
import HomePage from "./Pages/HomePage";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import BeritaPage from "./Pages/BeritaPage";
import PengumumanPage from "./Pages/PengumumanPage";
import KalenderPage from "./Pages/KalenderPage";
import GalleryPage from "./Pages/GalleryPage";
import ArtikelPage from "./Pages/ArtikelPage";
import BeritaView from "./Pages/BeritaView";
import ArtikelView from "./Pages/ArtikelView";
import DownloadAreaView from "./Pages/DownloadAreaView";
import GalleryView from "./Pages/GalleryView";
import InfografisAlbum from "./Pages/InfografisAlbum";
import InfografisView from "./Pages/InfografisView";
import PagesView from "./Pages/PagesView";
import EvenBulanIni2 from "./Widget/EventBulanIni2";
import PengumumanView from "./Pages/PengumumanView";
const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/beranda",
        element: <HomePage />,
      },
      {
        path: "/berita",
        element: <BeritaPage />,
      },
      {
        path: "/berita/:id",
        element: <BeritaView />,
      },
      {
        path: "/pengumuman",
        element: <PengumumanPage />,
      },
      {
        path: "/infografis",
        element: <InfografisAlbum />,
      },
      {
        path: "/infografis/:id",
        element: <InfografisView />,
      },
      {
        path: "/kalendar even",
        element: <KalenderPage />,
      },
      {
        path: "/gallery",
        element: <GalleryPage />,
      },
      {
        path: "/gallery/:id",
        element: <GalleryView />,
      },
      {
        path: "/artikel",
        element: <ArtikelPage />,
      },
      {
        path: "/artikel/:id",
        element: <ArtikelView />,
      },
      {
        path: "/download area",
        element: <DownloadAreaView />,
      },
      {
        path: "/pages/:route/:routes/:id",
        element: <PagesView/>,
      },
      {
        path: "/pages/:route/:id",
        element: <PagesView/>,
      },
      {
        path: "/events/:year/:month",
        element: <EvenBulanIni2/>,
      },
      {
        path: "/pengumuman/:id",
        element: <PengumumanView/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
