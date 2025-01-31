// 'use client';

// import { updateDocumentAccess } from '@/lib/actions/room.actions';
// import { useSelf } from '@liveblocks/react/suspense';
// import Image from 'next/image';
// import { useState } from 'react';

// import { useToast } from '@/components/ui/use-toast';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '../common/ui/dialog';
// import { Label } from '../common/ui/label';
// import Collaborator from './Collaborator';
// import UserTypeSelector from './UserType';
// import { Button } from './button';

// declare type UserType = 'creator' | 'editor' | 'viewer';

// declare type User = {
//   id: string;
//   name: string;
//   email: string;
//   avatar: string;
//   color: string;
//   userType?: UserType;
// };

// // declare type UserType = 'creator' | 'editor' | 'viewer';
// declare type ShareDocumentDialogProps = {
//   roomId: string;
//   collaborators: User[];
//   creatorId: string;
//   currentUserType: string;
// };

// const ShareModal = ({
//   roomId,
//   collaborators,
//   creatorId,
//   currentUserType,
// }: ShareDocumentDialogProps) => {
//   const user = useSelf();

//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);
//   const [email, setEmail] = useState('');
//   const [userType, setUserType] = useState<UserType>('viewer');
//   const isValidEmail = (email: string) => {
//     return /\S+@\S+\.\S+/.test(email);
//   };
//   const { toast } = useToast();
//   const shareDocumentHandler = async () => {
//     setLoading(true);
//     if (!email || !isValidEmail(email)) {
//       toast({
//         title: 'Uh oh! Something went wrong...',
//         description: 'Please enter a valid email address',
//         variant: 'destructive',
//       });
//       setLoading(false);
//       return;
//     }

//     try {
//       const result = await updateDocumentAccess({
//         roomId,
//         email,
//         userType: userType as UserType,
//         updatedBy: user.info,
//       });

//       if (result && !result.success) {
//         toast({
//           title: 'Uh oh! Something went wrong...',
//           description: result.message,
//           variant: 'destructive',
//         });
//       } else if (result) {
//         toast({
//           title: 'Action Successful...',
//           description: 'Document access updated successfully',
//           variant: 'success',
//         });
//         setEmail('');
//       } else {
//         throw new Error('Unexpected response from server');
//       }
//     } catch (error) {
//       toast({
//         title: 'Uh oh! Something went wrong...',
//         description: 'Failed to update document access',
//         variant: 'destructive',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="my-4">
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogTrigger>
//           <Button
//             className="w-50 px-8 flex h-9 bg-primary gap-1 text-white font-bold py-4"
//             disabled={currentUserType !== 'editor'}
//           >
//             <Image
//               src="/images/assets/icons/share.svg"
//               alt="share"
//               width={20}
//               height={20}
//               className="min-w-4 md:size-5"
//             />
//             <p className="mr-1 hidden sm:block">Share</p>
//           </Button>
//         </DialogTrigger>
//         <DialogContent className="w-11/12">
//           <DialogHeader>
//             <DialogTitle className="dark:text-white text-slate-700">
//               Manage who can view this transaction
//             </DialogTitle>
//             <DialogDescription className="dark:text-white ">
//               Select which users can view and edit this transaction document
//             </DialogDescription>
//           </DialogHeader>

//           <Label
//             htmlFor="email"
//             className="mt-2 text-slate-800 dark:text-white"
//           >
//             Email address
//           </Label>
//           <div className="flex items-center justify-around gap-1 mx-2">
//             <div className="flex items-center rounded-md bg-dark-400 w-full border-[1.5px] border-stroke dark:border-form-strokedark">
//               <input
//                 id="email"
//                 placeholder="Enter email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full rounded-l-lg bg-white px-5 py-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default dark:bg-form-input dark:text-white"
//               />
//               <UserTypeSelector userType={userType} setUserType={setUserType} />
//             </div>
//             <Button
//               type="submit"
//               onClick={shareDocumentHandler}
//               className=" px-4 flex h-9 gap-1 text-white font-bold py-4 "
//               disabled={loading}
//             >
//               {loading ? 'Sending...' : 'Invite'}
//             </Button>
//           </div>

//           <div className="">
//             <ul className="flex flex-col">
//               {collaborators.map((collaborator) => (
//                 <Collaborator
//                   key={collaborator.id}
//                   roomId={roomId}
//                   creatorId={creatorId}
//                   email={collaborator.email}
//                   collaborator={collaborator}
//                   user={user.info}
//                 />
//               ))}
//             </ul>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default ShareModal;

'use client';

import { useToast } from '@/components/ui/use-toast';
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
  const { toast } = useToast();

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const shareDocumentHandler = async () => {
    setLoading(true);
    if (!email || !isValidEmail(email)) {
      toast({
        title: 'Uh oh! Something went wrong...',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    try {
      const result = await updateDocumentAccess({
        roomId,
        email,
        userType: userType as UserType,
        updatedBy: user.info,
      });

      if (result && !result.success) {
        toast({
          title: 'Uh oh! Something went wrong...',
          description: result.message,
          variant: 'destructive',
        });
      } else if (result) {
        toast({
          title: 'Action Successful...',
          description: 'Document access updated successfully',
          variant: 'success',
        });
        setEmail('');
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (error) {
      toast({
        title: 'Uh oh! Something went wrong...',
        description: 'Failed to update document access',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-4 mx-2">
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
        <DialogContent className="w-11/12 bg-white dark:bg-boxdark rounded-sm border border-stroke shadow-default dark:border-strokedark">
          <DialogHeader>
            <DialogTitle className="text-title-sm2 font-bold text-black dark:text-white">
              Manage who can view this transaction
            </DialogTitle>
            <DialogDescription className="text-sm text-black dark:text-white">
              Select which users can view and edit this transaction document
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6">
            <Label
              htmlFor="email"
              className="mb-2.5 block text-black dark:text-white"
            >
              Email address
            </Label>
            <div className="flex items-center gap-2">
              <div className="flex-grow flex items-center rounded-lg border border-stroke bg-transparent dark:border-form-strokedark dark:bg-form-input">
                <input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-4 py-3 bg-transparent outline-none focus:border-primary focus-visible:shadow-none dark:text-white"
                />
                <UserTypeSelector
                  userType={userType}
                  setUserType={setUserType}
                />
              </div>
              <Button
                type="button"
                onClick={shareDocumentHandler}
                className="px-4 flex mx-2  h-9 gap-1 min-w-20 text-white font-bold py-4"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Invite'}
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <h5 className="mb-4 text-sm font-medium text-black dark:text-white">
              Current collaborators
            </h5>
            <div className="max-h-[300px] overflow-y-auto">
              <ul className="flex flex-col space-y-3">
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
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShareModal;
