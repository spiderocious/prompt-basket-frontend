import { useState } from 'react'
import { Textarea } from '../../../shared/ui/input'
import { MarkdownPreview } from '../components/markdown-preview'
import clsx from 'clsx'

export interface EditorContentProps {
  content: string
  onContentChange: (content: string) => void
  contentError?: string
}

type ViewMode = 'edit' | 'preview' | 'split'

export function EditorContent({ content, onContentChange, contentError }: EditorContentProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('split')

  const tabs = [
    { value: 'edit' as ViewMode, label: 'Edit' },
    { value: 'preview' as ViewMode, label: 'Preview' },
    { value: 'split' as ViewMode, label: 'Split' },
  ]

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-secondary-200 bg-white px-8">
        {tabs.map(tab => (
          <button
            key={tab.value}
            onClick={() => setViewMode(tab.value)}
            className={clsx(
              'px-4 py-2 text-sm font-medium transition-colors',
              viewMode === tab.value
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-secondary-600 hover:text-secondary-900'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <div
          className={clsx(
            'h-full grid',
            viewMode === 'split' ? 'grid-cols-2 gap-0' : 'grid-cols-1'
          )}
        >
          {/* Editor */}
          {(viewMode === 'edit' || viewMode === 'split') && (
            <div className="h-full overflow-y-auto border-r border-secondary-200">
              <Textarea
                value={content}
                onChange={(e) => onContentChange(e.target.value)}
                placeholder="Write your prompt here... You can use markdown formatting."
                error={contentError}
                className="h-full min-h-full resize-none border-0 focus:ring-0 rounded-none"
                style={{ minHeight: 'calc(100vh - 240px)' }}
              />
            </div>
          )}

          {/* Preview */}
          {(viewMode === 'preview' || viewMode === 'split') && (
            <div className="h-full overflow-y-auto bg-white">
              <MarkdownPreview content={content} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
