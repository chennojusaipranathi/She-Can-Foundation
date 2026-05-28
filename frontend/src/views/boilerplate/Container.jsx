import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Form from '../form/form'
import Success from '../form/success'
import View from '../form/view'
import Edit from '../form/edit'
import Signup from '../user/signup'
import Login from '../user/login'
import AllForms from '../form/all'
import ProtectedRoute from '../../components/ProtectedRoute'

import './Container.css'

/* ── Page transition variants ─────────────────────────────── */
const pageVariants = {
  initial: { opacity: 0, y: 28, filter: 'blur(10px)' },
  animate: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0, y: -20, filter: 'blur(6px)',
    transition: { duration: 0.32, ease: [0.7, 0, 0.84, 0] },
  },
}

function PageWrapper({ children }) {
  return (
    <motion.div
      className="page-wrapper"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}

/* ── Ambient orbs — rendered once, never unmount ──────────── */
function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient__orb ambient__orb--purple" />
      <div className="ambient__orb ambient__orb--cyan"   />
      <div className="ambient__orb ambient__orb--pink"   />
      <div className="ambient__orb ambient__orb--blue"   />
      <div className="ambient__noise" />
      <div className="ambient__grid" />
    </div>
  )
}

/* ── Container ────────────────────────────────────────────── */
function Container() {
  const location = useLocation()

  return (
    <>
      <AmbientBackground />

      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>

          {/* Public */}
          <Route path="/"       element={<PageWrapper><Login  /></PageWrapper>} />
          <Route path="/login"  element={<PageWrapper><Login  /></PageWrapper>} />
          <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />

          {/* Protected */}
          <Route path="/form"
            element={<ProtectedRoute><PageWrapper><Form /></PageWrapper></ProtectedRoute>}
          />
          <Route path="/success/:id"
            element={<ProtectedRoute><PageWrapper><Success /></PageWrapper></ProtectedRoute>}
          />
          <Route path="/view/:id"
            element={<ProtectedRoute><PageWrapper><View /></PageWrapper></ProtectedRoute>}
          />
          <Route path="/edit/:id"
            element={<ProtectedRoute><PageWrapper><Edit /></PageWrapper></ProtectedRoute>}
          />
          <Route path="/allForms"
            element={<ProtectedRoute><PageWrapper><AllForms /></PageWrapper></ProtectedRoute>}
          />

        </Routes>
      </AnimatePresence>
    </>
  )
}

export default Container