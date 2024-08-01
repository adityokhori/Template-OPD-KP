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
        path: "/kalender-event",
        element: <KalenderPage />,
      },
      {
        path: "/gallery",
        element: <GalleryPage />,
      },
      {
        path: "/artikel",
        element: <ArtikelPage />,
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
