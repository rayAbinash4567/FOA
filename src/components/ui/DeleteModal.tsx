'use client';

import { deleteDocument } from '@/lib/actions/room.actions';
import Image from 'next/image';
import { useState } from 'react';

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
import { toast } from './use-toast';
declare type DeleteModalProps = { roomId: string; currentUserId: string };
export const DeleteModal = ({ roomId, currentUserId }: DeleteModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const deleteDocumentHandler = async () => {
    setLoading(true);

    try {
      const result = await deleteDocument(roomId, currentUserId);

      if (result.success) {
        setOpen(false);
        toast({
          title: 'Success',
          description: 'Document deleted successfully',
          variant: 'success',
        });
      } else {
        toast({
          title: 'Error',
          description: result.message,
          variant: 'destructive',
        });
      }
    } catch (error: unknown) {
      console.error('Error deleting document:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete the document. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Image
          src="/images/assets/icons/delete.svg"
          alt="delete"
          width={28}
          height={28}
          className="cursor-pointer mx-2"
        />
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
