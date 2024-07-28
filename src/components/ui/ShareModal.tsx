'use client';

import { updateDocumentAccess } from '@/lib/actions/room.actions';
import { useSelf } from '@liveblocks/react/suspense';
import Image from 'next/image';
import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../common/ui/dialog';
import { Label } from '../common/ui/label';
import Collaborator from './Collaborator';
import UserTypeSelector from './UserType';
import { Button } from './button';
declare type UserType = 'creator' | 'editor' | 'viewer';

declare type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  color: string;
  userType?: UserType;
};

// declare type UserType = 'creator' | 'editor' | 'viewer';
declare type ShareDocumentDialogProps = {
  roomId: string;
  collaborators: User[];
  creatorId: string;
  currentUserType: string;
};

const ShareModal = ({
  roomId,
  collaborators,
  creatorId,
  currentUserType,
}: ShareDocumentDialogProps) => {
  const user = useSelf();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState<UserType>('viewer');

  const shareDocumentHandler = async () => {
    setLoading(true);

    await updateDocumentAccess({
      roomId,
      email,
      userType: userType as UserType,
      updatedBy: user.info,
    });

    setLoading(false);
  };

  return (
    <div className="my-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button
            className="w-50 px-8 flex h-9 bg-primary gap-1 text-white font-bold py-4"
            disabled={currentUserType !== 'editor'}
          >
            <Image
              src="/images/assets/icons/share.svg"
              alt="share"
              width={20}
              height={20}
              className="min-w-4 md:size-5"
            />
            <p className="mr-1 hidden sm:block">Share</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="w-11/12">
          <DialogHeader>
            <DialogTitle className="dark:text-white text-slate-700">
              Manage who can view this transaction
            </DialogTitle>
            <DialogDescription className="dark:text-white ">
              Select which users can view and edit this transaction document
            </DialogDescription>
          </DialogHeader>

          <Label
            htmlFor="email"
            className="mt-2 text-slate-800 dark:text-white"
          >
            Email address
          </Label>
          <div className="flex items-center justify-around gap-1 mx-2">
            <div className="flex items-center rounded-md bg-dark-400 w-full border-[1.5px] border-stroke dark:border-form-strokedark">
              <input
                id="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-l-lg bg-white px-5 py-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default dark:bg-form-input dark:text-white"
              />
              <UserTypeSelector userType={userType} setUserType={setUserType} />
            </div>
            <Button
              type="submit"
              onClick={shareDocumentHandler}
              className=" px-4 flex h-9 gap-1 text-white font-bold py-4 "
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Invite'}
            </Button>
          </div>

          <div className="">
            <ul className="flex flex-col">
              {collaborators.map((collaborator) => (
                <Collaborator
                  key={collaborator.id}
                  roomId={roomId}
                  creatorId={creatorId}
                  email={collaborator.email}
                  collaborator={collaborator}
                  user={user.info}
                />
              ))}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShareModal;
