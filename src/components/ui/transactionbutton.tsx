'use client';
import { createDocument } from '@/lib/actions/room.actions';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from './button';

declare type AddDocumentBtnProps = {
  userId: string;
  email: string;
};
const TransactionButton = ({ userId, email }: AddDocumentBtnProps) => {
  const router = useRouter();
  const addTransactionHandler = async () => {
    try {
      const room = await createDocument({ userId, email });
      if (room) {
        console.log(room);
        router.push(`/dashboard/transactions/${room?.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button
      type="submit"
      onClick={addTransactionHandler}
      className="text-white px-8 font-medium py-2.5 bg-primary rounded-md"
    >
      <Image
        src="/images/assets/icons/add.svg"
        alt="add-icon"
        height={20}
        width={20}
      />
      Create a new Transaction
    </Button>
  );
};

export default TransactionButton;
