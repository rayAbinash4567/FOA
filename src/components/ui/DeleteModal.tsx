'use client';

import Image from 'next/image';
import { useState } from 'react';

import { deleteDocument } from '@/lib/actions/room.actions';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../common/ui/dialog';
import { Button } from './button';
declare type DeleteModalProps = { roomId: string };
export const DeleteModal = ({ roomId }: DeleteModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteDocumentHandler = async () => {
    setLoading(true);

    try {
      await deleteDocument(roomId);
      setOpen(false);
    } catch (error) {
      console.log('Error notif:', error);
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className=" px-2">
          <Image
            src="/images/assets/icons/delete.svg"
            alt="delete"
            width={20}
            height={20}
            className="mt-1 bg-slate-100 bg-none"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="px-4">
        <DialogHeader>
          <Image
            src="/images/assets/icons/delete-modal.svg"
            alt="delete"
            width={48}
            height={48}
            className="mb-4"
          />
          <DialogTitle className="dark:text-white text-center text-2xl text-black">
            Delete Transaction
          </DialogTitle>
          <DialogDescription className="dark:text-white text-center text-md mt-4 pt-4 ">
            Are you sure you want to delete this transaction? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-5">
          <DialogClose asChild className="w-full bg-dark-400 text-white">
            Cancel
          </DialogClose>

          <div className="flex w-full justify-center items-center">
            <Button
              onClick={deleteDocumentHandler}
              className=" w-2/3 text-white mt-2  bg-red hover:bg-rose-500"
            >
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
