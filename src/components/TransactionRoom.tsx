'use client';

import { Editor } from '@/components/editor/Editor';
import { updateDocument } from '@/lib/actions/room.actions';
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ActiveCollaborators from './ActiveCollaborators';
import Breadcrumb from './Breadcrumbs/Breadcrumb';
import Loader from './common/Loader';
import ShareModal from './ui/ShareModal';

declare type UserType = 'creator' | 'editor' | 'viewer';
declare type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  color: string;
  userType?: UserType;
};

declare type CollaborativeRoomProps = {
  roomId: string;
  roomMetadata: RoomMetadata;
  users: User[];
  currentUserType: string;
};

declare type RoomMetadata = {
  creatorId: string;
  email: string;
  title: string;
};

const TransactionRoom = ({
  roomId,
  roomMetadata,
  users,
  currentUserType,
}: CollaborativeRoomProps) => {
  // const currentUserType = 'editor';
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateTitleHandler = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      setLoading(true);

      try {
        if (documentTitle !== roomMetadata.title) {
          const updatedDocument = await updateDocument(roomId, documentTitle);
          if (updatedDocument) {
            roomMetadata.title = documentTitle;
            setEditing(false);
          }
        } else {
          setEditing(false);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
  };

  const handleClickOutside = async (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setEditing(false);
      setLoading(true);
      if (documentTitle !== roomMetadata.title) {
        try {
          await updateDocument(roomId, documentTitle);
          roomMetadata.title = documentTitle;
        } catch (err) {
          console.error(err);
        }
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [documentTitle]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <div className="mt-8 mb-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Transaction Room" />
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div ref={containerRef} className="relative flex items-center">
            {editing && !loading ? (
              <input
                type="text"
                value={documentTitle}
                ref={inputRef}
                placeholder="Enter property location"
                onChange={(e) => setDocumentTitle(e.target.value)}
                onKeyDown={updateTitleHandler}
                className="w-full py-2 pr-10 text-2xl font-bold outline-none dark:bg-boxdark dark:text-white"
                autoFocus
              />
            ) : (
              <p className="py-4 font-bold text-2xl">{documentTitle}</p>
            )}
            {currentUserType === 'editor' && !editing && (
              <Image
                src="/images/assets/icons/edit.svg"
                alt="edit-icon"
                width={24}
                height={24}
                onClick={() => setEditing(true)}
                className="mx-4 cursor-pointer"
              />
            )}
            {currentUserType !== 'editor' && !editing && (
              <p className="mx-8 cursor-pointer bg-red text-white px-2 py-1 font-bold text-sm rounded-md">
                View Only
              </p>
            )}
          </div>
          {loading && !editing && (
            <p className="text-m text-green-400 mx-4 cursor-pointer ">
              saving...
            </p>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="mt-4">
          <RoomProvider id={roomId}>
            <ClientSideSuspense
              fallback={
                <div>
                  <Loader />
                </div>
              }
            >
              {
                <div className="mb-4">
                  <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3 ">
                    <ActiveCollaborators />
                    {(currentUserType === 'editor' ||
                      currentUserType === 'creator') && (
                      <ShareModal
                        roomId={roomId}
                        collaborators={users}
                        creatorId={roomMetadata.creatorId}
                        currentUserType={currentUserType}
                      />
                    )}
                  </div>
                  <div className="">
                    <Editor roomid={roomId} currentUserType={currentUserType} />
                  </div>
                </div>
              }
            </ClientSideSuspense>
          </RoomProvider>
        </div>
      </div>
    </div>
  );
};

export default TransactionRoom;
