import {
  removeCollaborator,
  updateDocumentAccess,
} from '@/lib/actions/room.actions';
import Image from 'next/image';
import { useState } from 'react';
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

declare type CollaboratorProps = {
  roomId: string;
  email: string;
  creatorId: string;
  collaborator: User;
  user: User;
};
const Collaborator = ({
  roomId,
  creatorId,
  collaborator,
  email,
  user,
}: CollaboratorProps) => {
  const [userType, setUserType] = useState(collaborator.userType || 'viewer');
  const [loading, setLoading] = useState(false);
  //   console.log('collaborator', +' ' + creatorId, +' ' + collaborator.id);

  const shareDocumentHandler = async (type: string) => {
    setLoading(true);

    await updateDocumentAccess({
      roomId,
      email,
      userType: type as UserType,
      updatedBy: user,
    });

    setLoading(false);
  };

  const removeCollaboratorHandler = async (email: string) => {
    setLoading(true);

    await removeCollaborator({ roomId, email });

    setLoading(false);
  };

  return (
    <li className="flex items-center justify-between gap-2 py-3">
      <div className="flex gap-2">
        <Image
          src={collaborator.avatar}
          alt={collaborator.name}
          width={36}
          height={36}
          className="size-9 rounded-full"
        />
        <div>
          <p className="line-clamp-1 text-sm font-semibold leading-4 text-boxdark-2 dark:text-white">
            {collaborator.name}
            <span className="text-10-regular pl-2 ">
              {loading && 'updating...'}
            </span>
          </p>
          <p className="text-sm font-light text-black dark:text-white">
            {collaborator.email}
          </p>
        </div>
      </div>

      {creatorId === collaborator.id ? (
        <p className="text-sm  font-bold bg-green-400 rounded-md px-2 py-1 text-white">
          Leader
        </p>
      ) : (
        <div className="flex items-center">
          <UserTypeSelector
            userType={userType as UserType}
            setUserType={setUserType || 'viewer'}
            onClickHandler={shareDocumentHandler}
          />
          <Button
            type="button"
            className="px-4 flex h-9 gap-1 min-w-20 text-white font-bold py-4"
            onClick={() => removeCollaboratorHandler(collaborator.email)}
          >
            Remove
          </Button>
        </div>
      )}
    </li>
  );
};

export default Collaborator;
