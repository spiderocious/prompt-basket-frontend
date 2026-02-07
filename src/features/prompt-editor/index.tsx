import { usePromptEditor } from './hooks/use-prompt-editor'
import { EditorHeader } from './parts/editor-header'
import { EditorContent } from './parts/editor-content'

export function PromptEditor() {
  const {
    title,
    setTitle,
    content,
    setContent,
    bucketId,
    setBucketId,
    isDirty,
    errors,
    saving,
    isEditing,
    handleSave,
    handleCancel,
  } = usePromptEditor()

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <EditorHeader
        title={title}
        onTitleChange={setTitle}
        bucketId={bucketId}
        onBucketChange={setBucketId}
        onSave={handleSave}
        onCancel={handleCancel}
        saving={saving}
        isDirty={isDirty}
        isEditing={isEditing}
        titleError={errors.title}
      />

      <EditorContent
        content={content}
        onContentChange={setContent}
        contentError={errors.content}
      />
    </div>
  )
}
