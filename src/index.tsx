import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SongTest } from "./SongTest/SongTest";
import { SongsTest } from "./SongsTest/SongsTest";
import { LyricsSearch } from "./LyricsSearch/LyricsSearch";
import { RandomQuote } from "./RandomQuote/RandomQuote";
import { BlankSpace } from "./BlankSpace/BlankSpace";
import { SongHeardle } from "./SongHeardle/SongHeardle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/lyrics-search",
    element: <LyricsSearch />,
  },
  {
    path: "/test",
    element: <SongTest />,
  },
  {
    path: "/songs-test",
    element: <SongsTest />,
  },
  {
    path: "/random-quote",
    element: <RandomQuote />,
  },
  {
    path: "/blank-space",
    element: <BlankSpace />,
  },
  {
    path: "/taylor-heardle",
    element: <SongHeardle />,
  },
]);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
