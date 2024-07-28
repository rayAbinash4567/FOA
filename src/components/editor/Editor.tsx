'use client';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode } from '@lexical/rich-text';
import {
  FloatingComposer,
  FloatingThreads,
  LiveblocksPlugin,
  liveblocksConfig,
  useEditorStatus,
} from '@liveblocks/react-lexical';
import { useThreads } from '@liveblocks/react/suspense';
import Loader from '../common/Loader';
import Comments from '../ui/Comment';
import FloatingToolbar from './plugins/FloatingToolbarPlugin';
import Theme from './plugins/Theme';
import ToolbarPlugin from './plugins/ToolbarPlugin';
function Placeholder() {
  return (
    <div className=" text-m text-gray-500 font-bold dark:text-gray-400">
      Enter transaction details ......
    </div>
  );
}

export function Editor({
  roomid,
  currentUserType,
}: {
  roomid: string;
  currentUserType: string;
}) {
  const status = useEditorStatus();
  const { threads } = useThreads();
  const initialConfig = liveblocksConfig({
    namespace: 'Editor',
    nodes: [HeadingNode],
    onError: (error: Error) => {
      console.error(error);
      throw error;
    },
    theme: Theme,
    editable: currentUserType === 'editor',
  });

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className=" rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="p-6">
          <ToolbarPlugin />
        </div>
        <div className="p-4 relative">
          <div className="flex p-2">
            {status === 'loading' || status === 'not-loaded' ? (
              <Loader />
            ) : (
              <>
                <div className="mt-2 h-[500px] relative w-2/3">
                  <RichTextPlugin
                    contentEditable={
                      <ContentEditable className="outline-none text-gray-900 dark:text-white" />
                    }
                    placeholder={<Placeholder />}
                    ErrorBoundary={LexicalErrorBoundary}
                  />
                  {currentUserType === 'editor' && <FloatingToolbar />}
                  <HistoryPlugin />
                  <AutoFocusPlugin />
                </div>
              </>
            )}

            <LiveblocksPlugin>
              <FloatingComposer className="  w-[250px] " />
              <div className="w-1/3">
                <FloatingThreads threads={threads} />
                <Comments />
              </div>
            </LiveblocksPlugin>
          </div>
        </div>
      </div>
    </LexicalComposer>
  );
}
