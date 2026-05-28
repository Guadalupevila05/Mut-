import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { AppShell } from './components/layout/AppShell';
// Pages
import { Home } from './pages/Home';
import { Feed } from './pages/Feed';
import { ProductDetail } from './pages/ProductDetail';
import { Profile } from './pages/Profile';
import { Upload } from './pages/Upload';
import { ChatList } from './pages/ChatList';
import { ChatThread } from './pages/ChatThread';
import { Auth } from './pages/Auth';
import { ResetPassword } from './pages/ResetPassword';
import { Favorites } from './pages/Favorites';
import { ProtectedRoute } from './components/ProtectedRoute';

// Page Transition Wrapper
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

// PageWrapper SIEMPRE va por fuera de ProtectedRoute. Si lo dejamos adentro,
// cuando ProtectedRoute redirige con <Navigate/> el motion.div desaparece
// antes de poder hacer su exit animation y AnimatePresence se queda colgada.
const Protected = ({ children }: { children: React.ReactNode }) => (
  <PageWrapper>
    <ProtectedRoute>{children}</ProtectedRoute>
  </PageWrapper>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />

        <Route
          path="/feed"
          element={
            <Protected>
              <Feed />
            </Protected>
          }
        />

        <Route
          path="/product/:id"
          element={
            <Protected>
              <ProductDetail />
            </Protected>
          }
        />

        <Route
          path="/profile/:username"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />

        <Route
          path="/upload"
          element={
            <Protected>
              <Upload />
            </Protected>
          }
        />

        <Route
          path="/chat"
          element={
            <Protected>
              <ChatList />
            </Protected>
          }
        />

        <Route
          path="/chat/:id"
          element={
            <Protected>
              <ChatThread />
            </Protected>
          }
        />

        <Route
          path="/auth"
          element={
            <PageWrapper>
              <Auth />
            </PageWrapper>
          }
        />

        <Route
          path="/reset-password"
          element={
            <PageWrapper>
              <ResetPassword />
            </PageWrapper>
          }
        />

        <Route
          path="/favorites"
          element={
            <Protected>
              <Favorites />
            </Protected>
          }
        />

        <Route
          path="/onboarding"
          element={
            <Protected>
              <div className="p-8 text-center mt-20">Onboarding Screen</div>
            </Protected>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppShell>
          <AnimatedRoutes />
        </AppShell>
      </BrowserRouter>
    </ThemeProvider>
  );
}
