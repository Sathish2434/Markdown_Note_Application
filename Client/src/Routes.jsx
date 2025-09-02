import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";

import UserLogin from "./pages/user-login";
import MarkdownEditor from "./pages/markdown-editor";
import Dashboard from "./pages/dashboard";
import UserRegistration from "./pages/user-registration";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";

const Routes = () => {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        
        {/* Notes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/markdown-editor" element={<MarkdownEditor />} />       {/* new note */}
        <Route path="/markdown-editor/:id" element={<MarkdownEditor />} />   {/* edit note */}
        
        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
    </ErrorBoundary>
  );
};

export default Routes;
