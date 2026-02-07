import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StorageProvider } from '../shared/services'
import { AppLayout } from './layout'
import { Dashboard } from '../features/dashboard'
import { PromptLibrary } from '../features/prompt-library'
import { PromptEditor } from '../features/prompt-editor'
import { BucketsPage } from '../features/buckets-page'

function App() {
  return (
    <StorageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="prompts" element={<PromptLibrary />} />
            <Route path="prompts/new" element={<PromptEditor />} />
            <Route path="prompts/:id/edit" element={<PromptEditor />} />
            <Route path="buckets" element={<BucketsPage />} />
            <Route path="buckets/:id" element={<BucketsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StorageProvider>
  )
}

export default App
