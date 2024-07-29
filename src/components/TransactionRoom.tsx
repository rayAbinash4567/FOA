'use client';

import { Editor } from '@/components/editor/Editor';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { updateDocument } from '@/lib/actions/room.actions';
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
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
  const [closeDate, setCloseDate] = useState<Date | undefined>(undefined);
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
          <div>
            <h2 className="py-4 font-bold text-2xl text-black text-center dark:text-white">
              Transaction Working Committee
            </h2>
          </div>
          <div ref={containerRef} className="relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="flex items-center w-full sm:w-3/4 mb-2 sm:mb-0">
                {editing && !loading ? (
                  <input
                    type="text"
                    value={documentTitle}
                    ref={inputRef}
                    placeholder="Enter property location"
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    onKeyDown={updateTitleHandler}
                    className="w-full text-md font-bold outline-none dark:bg-boxdark dark:text-white"
                    autoFocus
                  />
                ) : (
                  <>
                    <span className="font-bold text-black mr-2 dark:text-white whitespace-nowrap">
                      Transaction Committee Title:
                    </span>
                    <div className="flex items-center flex-grow truncate">
                      <span className="truncate">{documentTitle}</span>
                      {currentUserType === 'editor' && !editing && (
                        <Image
                          src={'/images/assets/icons/edit.svg'}
                          alt="edit-icon"
                          width={24}
                          height={24}
                          onClick={() => setEditing(true)}
                          className="cursor-pointer ml-2 flex-shrink-0"
                        />
                      )}
                      {currentUserType !== 'editor' && !editing && (
                        <div className="bg-red px-2 text-center whitespace-nowrap text-white py-1 font-bold rounded-md ml-2 flex-shrink-0">
                          View Only
                        </div>
                      )}
                    </div>
                  </>
                )}
                {loading && !editing && (
                  <span className="ml-2 font-md text-green-400 whitespace-nowrap flex-shrink-0">
                    saving...
                  </span>
                )}
              </div>
              <div className="whitespace-nowrap flex-shrink-0 mt-2 sm:mt-0">
                <span className="font-bold text-black px-2 dark:text-white">
                  Close Date:
                </span>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {closeDate ? (
                        format(closeDate, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={closeDate}
                      onSelect={setCloseDate}
                      initialFocus
                      className="rounded-md  bg-white dark:bg-boxdark"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="mt-8 ">
            <span className="font-bold text-black mr-2 dark:text-white">
              Transaction Committee Lead Coordinator (Leader) :
            </span>
            John Doe
          </div>
          <div className="mt-8 ">
            <span className="font-bold text-black mr-2 dark:text-white">
              Transaction Committee Participants:
            </span>
            {/* Table for   Transaction Committee Participants:*/}
            <div className="rounded-sm border my-4 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full">
              <div className="px-4 py-6 md:px-6 xl:px-7.5">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                  Team Members
                </h4>
              </div>

              <div className="grid grid-cols-12 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5">
                <div className="col-span-3 flex items-center">
                  <p className="font-medium">Name</p>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="font-medium">Role</p>
                </div>
                <div className="col-span-5 flex items-center">
                  <p className="font-medium">Partnership Status</p>
                </div>
                <div className="col-span-2 flex items-center justify-end">
                  <p className="font-medium">Action</p>
                </div>
              </div>

              {[
                {
                  name: 'Olivia Brennan',
                  role: 'Realtor',
                  status: 'Pinnacle Partnerships Partner Member',
                },
                {
                  name: 'Ethan Zhao',
                  role: 'Lawyer',
                  status: 'Non-Pinnacle Partnership Partner Member',
                },
                {
                  name: 'Amelia Sinclair',
                  role: 'Title',
                  status: 'Pinnacle Partnerships Partner Member',
                },
                {
                  name: 'Marcus Holloway',
                  role: 'Mortgage Broker',
                  status: 'Pinnacle Partnerships Partner Member',
                },
              ].map((member, key) => (
                <div
                  className="grid grid-cols-12 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
                  key={key}
                >
                  <div className="col-span-3 flex items-center">
                    <p className="text-sm text-black dark:text-white">
                      {member.name}
                    </p>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <p className="text-sm text-black dark:text-white">
                      {member.role}
                    </p>
                  </div>
                  <div className="col-span-5 flex items-center">
                    <p className="text-sm text-black dark:text-white">
                      {member.status}
                    </p>
                  </div>
                  <div className="col-span-2 flex items-center justify-end">
                    <button className="text-sm text-blue-500 hover:text-blue-700">
                      Send Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
