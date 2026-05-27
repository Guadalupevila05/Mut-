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
// Page Transition Wrapper
const PageWrapper = ({ children }: {children: React.ReactNode;}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      exit={{
        opacity: 0,
        y: -10
      }}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="w-full h-full">
      
      {children}
    </motion.div>);

};
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
          } />
        
        <Route
          path="/feed"
          element={
          <PageWrapper>
              <Feed />
            </PageWrapper>
          } />
        
        <Route
          path="/product/:id"
          element={
          <PageWrapper>
              <ProductDetail />
            </PageWrapper>
          } />
        
        <Route
          path="/profile/:username"
          element={
          <PageWrapper>
              <Profile />
            </PageWrapper>
          } />
        
        <Route
          path="/upload"
          element={
          <PageWrapper>
              <Upload />
            </PageWrapper>
          } />
        
        <Route
          path="/chat"
          element={
          <PageWrapper>
              <ChatList />
            </PageWrapper>
          } />
        
        <Route
          path="/chat/:id"
          element={
          <PageWrapper>
              <ChatThread />
            </PageWrapper>
          } />
        
        <Route
          path="/auth"
          element={
          <PageWrapper>
              <Auth />
            </PageWrapper>
          } />
        
        <Route
          path="/favorites"
          element={
          <PageWrapper>
              <div className="p-8 text-center mt-20">
                Todavía no guardaste nada — empezá a explorar
              </div>
            </PageWrapper>
          } />
        
        <Route
          path="/onboarding"
          element={
          <PageWrapper>
              <div className="p-8 text-center mt-20">Onboarding Screen</div>
            </PageWrapper>
          } />
        
      </Routes>
    </AnimatePresence>);

};
export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppShell>
          <AnimatedRoutes />
        </AppShell>
      </BrowserRouter>
    </ThemeProvider>);

}