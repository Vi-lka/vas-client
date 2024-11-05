'use client'

import '@mdxeditor/editor/style.css'
import type { MDXEditorMethods } from "@mdxeditor/editor";
import { 
    BlockTypeSelect, 
    BoldItalicUnderlineToggles, 
    CreateLink, 
    InsertThematicBreak,
    MDXEditor, 
    UndoRedo, 
    headingsPlugin, 
    linkDialogPlugin, 
    linkPlugin,  
    markdownShortcutPlugin, 
    quotePlugin, 
    thematicBreakPlugin, 
    toolbarPlugin 
} from "@mdxeditor/editor"
import type {FC} from 'react';

interface EditorProps {
  markdown: string,
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>,
  onChange: ((markdown: string) => void)
}

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs. 
**/
const Editor: FC<EditorProps> = ({ markdown, editorRef, onChange }) => {
  return (
    <article className="prose lg:prose-base prose-sm prose-headings:text-foreground prose-blockquote:text-muted-foreground prose-strong:text-foreground prose-a:text-primary max-w-none w-full">
        <MDXEditor 
          ref={editorRef}
          markdown={markdown}
          onChange={onChange}
          contentEditableClassName={"!text-foreground"}
          className='bg-background shadow'
          plugins={[
            headingsPlugin(),
            quotePlugin(),
            linkPlugin(),
            linkDialogPlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
            toolbarPlugin({
                toolbarContents: () => (
                  <>
                    {' '}
                    <UndoRedo />
                    <BoldItalicUnderlineToggles />
                    <BlockTypeSelect />
                    <CreateLink />
                    <InsertThematicBreak />
                  </>
                )
            })
          ]} 
        />
    </article>
  )
}

export default Editor