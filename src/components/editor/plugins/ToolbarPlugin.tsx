import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
} from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { $findMatchingParent, mergeRegister } from '@lexical/utils';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
// import IconButton from './IconButton';
const Redo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-arrow-clockwise"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
    />
    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
  </svg>
);
const Undo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-arrow-counterclockwise"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
    />
    <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
  </svg>
);
const Bold = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-type-bold"
    viewBox="0 0 16 16"
  >
    <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z" />
  </svg>
);
const I = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-type-italic"
    viewBox="0 0 16 16"
  >
    <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z" />
  </svg>
);
const U = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-type-underline"
    viewBox="0 0 16 16"
  >
    <path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57-1.709 0-2.687-1.08-2.687-2.57V3.136zM12.5 15h-9v-1h9v1z" />
  </svg>
);
const Strike = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-type-strikethrough"
    viewBox="0 0 16 16"
  >
    <path d="M6.333 5.686c0 .31.083.581.27.814H5.166a2.776 2.776 0 0 1-.099-.76c0-1.627 1.436-2.768 3.48-2.768 1.969 0 3.39 1.175 3.445 2.85h-1.23c-.11-1.08-.964-1.743-2.25-1.743-1.23 0-2.18.602-2.18 1.607zm2.194 7.478c-2.153 0-3.589-1.107-3.705-2.81h1.23c.144 1.06 1.129 1.703 2.544 1.703 1.34 0 2.31-.705 2.31-1.675 0-.827-.547-1.374-1.914-1.675L8.046 8.5H1v-1h14v1h-3.504c.468.437.675.994.675 1.697 0 1.826-1.436 2.967-3.644 2.967z" />
  </svg>
);
const H1 = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 7H13V17H11V13H7V17H5V7H7V11H11V7ZM17.57 7C16.9763 7.94914 16.0659 8.65761 15 9V10H17V17H19V7H17.57Z"
      fill="currentColor"
    />
  </svg>
);

const H2 = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 7.00047H11V17.0005H9V13.0005H5V17.0005H3V7.00047H5V11.0005H9V7.00047ZM17 15.0005C17.51 14.5905 17.6 14.3805 18.06 13.9505C18.497 13.5505 18.908 13.1225 19.29 12.6705C19.6237 12.2795 19.9091 11.8497 20.14 11.3905C20.339 11.0005 20.445 10.5685 20.45 10.1305C20.455 9.68916 20.3628 9.25216 20.18 8.85047C20.0027 8.46566 19.7433 8.12433 19.42 7.85047C19.074 7.56738 18.6768 7.35349 18.25 7.22047C17.7649 7.06758 17.2585 6.9933 16.75 7.00047C16.391 7.00047 16.033 7.03347 15.68 7.10047C15.3373 7.16131 15.0021 7.25853 14.68 7.39047C14.3759 7.52118 14.0875 7.68553 13.82 7.88047C13.533 8.09047 13.259 8.31747 13 8.56047L14.24 9.78047C14.5479 9.51279 14.8831 9.27817 15.24 9.08047C15.59 8.87947 15.987 8.77647 16.39 8.78047C16.8451 8.75146 17.2956 8.88625 17.66 9.16047C17.971 9.43847 18.137 9.84447 18.11 10.2605C18.0958 10.6568 17.9711 11.0413 17.75 11.3705C17.4647 11.8234 17.1292 12.2427 16.75 12.6205C16.31 13.0505 15.77 13.5405 15.16 14.0505C14.55 14.5605 13.75 15.1105 13 15.7005V17.0005H21V15.0005H17Z"
      fill="currentColor"
    />
  </svg>
);
const H3 = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.11 14.2177C14.465 14.5047 14.859 14.7407 15.28 14.9177C15.714 15.0987 16.18 15.1907 16.65 15.1877C17.134 15.2047 17.615 15.1017 18.05 14.8877C18.2132 14.816 18.3521 14.6984 18.4497 14.5493C18.5473 14.4002 18.5996 14.2259 18.6 14.0477C18.6028 13.8444 18.551 13.6441 18.45 13.4677C18.3268 13.2766 18.1492 13.1268 17.94 13.0377C17.6212 12.9006 17.2845 12.8097 16.94 12.7677C16.4367 12.6949 15.9285 12.6614 15.42 12.6677V11.0977C16.1616 11.1498 16.905 11.0265 17.59 10.7377C17.7716 10.6572 17.9269 10.5274 18.0383 10.363C18.1497 10.1985 18.2127 10.0061 18.22 9.80765C18.2328 9.65123 18.2044 9.49418 18.1378 9.35209C18.0711 9.21 17.9685 9.08781 17.84 8.99765C17.4994 8.79445 17.1061 8.69699 16.71 8.71765C16.3146 8.73046 15.9263 8.82584 15.57 8.99765C15.1949 9.1646 14.8394 9.37254 14.51 9.61765L13.29 8.22765C13.7908 7.85073 14.3431 7.54764 14.93 7.32765C15.5381 7.10356 16.1819 6.99175 16.83 6.99765C17.355 6.9906 17.8789 7.04769 18.39 7.16765C18.821 7.26865 19.23 7.44465 19.6 7.68765C19.925 7.89865 20.195 8.18265 20.39 8.51765C20.58 8.85965 20.677 9.24665 20.67 9.63765C20.681 10.1177 20.493 10.5807 20.15 10.9177C19.7329 11.3087 19.2343 11.6024 18.69 11.7777V11.8377C19.299 11.9777 19.865 12.2627 20.34 12.6677C20.777 13.0497 21.02 13.6077 21 14.1877C21.005 14.6087 20.887 15.0227 20.66 15.3777C20.4293 15.7343 20.1218 16.035 19.76 16.2577C19.3524 16.5108 18.9067 16.6965 18.44 16.8077C17.9265 16.9357 17.3992 16.9995 16.87 16.9977C16.0838 17.0168 15.3008 16.8914 14.56 16.6277C13.9698 16.4132 13.4338 16.0719 12.99 15.6277L14.11 14.2177ZM9 10.9997H5V6.99965H3V16.9997H5V12.9997H9V16.9997H11V6.99965H9V10.9997Z"
      fill="currentColor"
    />
  </svg>
);
const LeftAlignIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
    />
  </svg>
);
const RightAlignIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-text-right"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
    />
  </svg>
);
const CenterAlignIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-text-center"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
    />
  </svg>
);
const JustifyAlignIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-justify"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
    />
  </svg>
);
const LowPriority = 1;

function Divider() {
  return (
    <div className="border-r border-stroke dark:border-strokedark h-6 mx-2" />
  );
}

interface IconButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  onClick,
  isActive = false,
  disabled = false,
}) => (
  <button
    onClick={onClick}
    className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
      isActive
        ? 'text-blue-600 dark:text-blue-400'
        : 'text-gray-700 dark:text-gray-300'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    aria-label={label}
    disabled={disabled}
  >
    {icon}
  </button>
);

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const activeBlock = useActiveBlock();

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);

  const toggleBlock = useCallback(
    (blockType: 'h1' | 'h2' | 'h3' | 'quote') => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          if (activeBlock === blockType) {
            $setBlocksType(selection, () => $createParagraphNode());
          } else {
            switch (blockType) {
              case 'h1':
              case 'h2':
              case 'h3':
                $setBlocksType(selection, () => $createHeadingNode(blockType));
                break;
              case 'quote':
                $setBlocksType(selection, () => $createQuoteNode());
                break;
            }
          }
        }
      });
    },
    [editor, activeBlock]
  );

  return (
    <div
      className="toolbar flex items-center bg-white dark:bg-boxdark rounded-t-sm border-b border-stroke dark:border-strokedark p-2"
      ref={toolbarRef}
    >
      <IconButton
        icon={<Undo />}
        label="Undo"
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        disabled={!canUndo}
      />
      <IconButton
        icon={<Redo />}
        label="Redo"
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        disabled={!canRedo}
      />
      <Divider />
      <IconButton
        icon={<H1 />}
        label="Heading 1"
        onClick={() => toggleBlock('h1')}
        isActive={activeBlock === 'h1'}
      />
      <IconButton
        icon={<H2 />}
        label="Heading 2"
        onClick={() => toggleBlock('h2')}
        isActive={activeBlock === 'h2'}
      />
      <IconButton
        icon={<H3 />}
        label="Heading 3"
        onClick={() => toggleBlock('h3')}
        isActive={activeBlock === 'h3'}
      />
      <Divider />
      <IconButton
        icon={<Bold />}
        label="Bold"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
        isActive={isBold}
      />
      <IconButton
        icon={<I />}
        label="Italic"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
        isActive={isItalic}
      />
      <IconButton
        icon={<U />}
        label="Underline"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
        isActive={isUnderline}
      />
      <IconButton
        icon={<Strike />}
        label="Strikethrough"
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')
        }
        isActive={isStrikethrough}
      />
      <Divider />
      <IconButton
        icon={<LeftAlignIcon />}
        label="Left Align"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')}
      />
      <IconButton
        icon={<CenterAlignIcon />}
        label="Center Align"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')}
      />
      <IconButton
        icon={<RightAlignIcon />}
        label="Right Align"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')}
      />
      <IconButton
        icon={<JustifyAlignIcon />}
        label="Justify Align"
        onClick={() =>
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')
        }
      />
    </div>
  );
}

function useActiveBlock() {
  const [editor] = useLexicalComposerContext();

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      return editor.registerUpdateListener(onStoreChange);
    },
    [editor]
  );

  const getSnapshot = useCallback(() => {
    return editor.getEditorState().read(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return null;

      const anchor = selection.anchor.getNode();
      let element =
        anchor.getKey() === 'root'
          ? anchor
          : $findMatchingParent(anchor, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchor.getTopLevelElementOrThrow();
      }

      if ($isHeadingNode(element)) {
        return element.getTag();
      }

      return element.getType();
    });
  }, [editor]);

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
