export interface MarkdownPreviewProps {
  content: string
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  // Simple markdown preview - in production, use a library like marked or react-markdown
  const renderContent = (text: string) => {
    if (!text) {
      return <p className="text-secondary-400">Preview will appear here...</p>
    }

    // Basic markdown rendering (simplified)
    const lines = text.split('\n')
    return lines.map((line, i) => {
      // Headers
      if (line.startsWith('### ')) {
        return <h3 key={i} className="text-lg font-semibold mt-4 mb-2">{line.slice(4)}</h3>
      }
      if (line.startsWith('## ')) {
        return <h2 key={i} className="text-xl font-semibold mt-4 mb-2">{line.slice(3)}</h2>
      }
      if (line.startsWith('# ')) {
        return <h1 key={i} className="text-2xl font-bold mt-4 mb-2">{line.slice(2)}</h1>
      }

      // Code blocks
      if (line.startsWith('```')) {
        return <div key={i} className="bg-secondary-100 p-2 rounded my-2 font-mono text-sm">{line}</div>
      }

      // Lists
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return <li key={i} className="ml-4">{line.slice(2)}</li>
      }

      // Regular paragraph
      if (line.trim()) {
        return <p key={i} className="mb-2">{line}</p>
      }

      return <br key={i} />
    })
  }

  return (
    <div className="prose prose-sm max-w-none p-4 text-secondary-900">
      {renderContent(content)}
    </div>
  )
}
