import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import ImageOptimizer from './pages/ImageOptimizer.tsx'
import BackgroundRemover from './pages/BackgroundRemover.tsx'
import QrGenerator from './pages/QrGenerator.tsx'
import PasswordGenerator from './pages/PasswordGenerator.tsx'
import TextConverter from './pages/TextConverter.tsx'
import YouTubeDownloader from './pages/YouTubeDownloader.tsx'
import ImageConverter from './pages/ImageConverter.tsx'
import ScreenRecorder from './pages/ScreenRecorder.tsx'
import PdfTools from './pages/PdfTools.tsx'
import PrivacyPolicy from './pages/PrivacyPolicy.tsx'
import TermsOfService from './pages/TermsOfService.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/image-optimizer" element={<ImageOptimizer />} />
        <Route path="/background-remover" element={<BackgroundRemover />} />
        <Route path="/qr-generator" element={<QrGenerator />} />
        <Route path="/password-generator" element={<PasswordGenerator />} />
        <Route path="/text-converter" element={<TextConverter />} />
        <Route path="/youtube-thumbnail" element={<YouTubeDownloader />} />
        <Route path="/image-converter" element={<ImageConverter />} />
        <Route path="/screen-recorder" element={<ScreenRecorder />} />
        <Route path="/pdf-tools" element={<PdfTools />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
