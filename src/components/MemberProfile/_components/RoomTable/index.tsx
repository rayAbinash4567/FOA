import { BadgesItem } from '@/components/common/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { getDocuments } from '@/lib/actions/room.actions';
import { dateConverter } from '@/lib/utils';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Room {
  type: string;
  id: string;
  lastConnectionAt: string;
  createdAt: string;
  metadata: {
    title?: string;
  };
}

interface RoomResponse {
  data: Room[];
}

const RoomTable: React.FC<{ userEmail: string }> = ({ userEmail }) => {
  const [rooms, setRooms] = useState<RoomResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const fetchedRooms: RoomResponse = await getDocuments(userEmail);
        setRooms(fetchedRooms);
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [userEmail]);

  if (loading) {
    return (
      <TableRow>
        <TableCell colSpan={5} className="text-center">
          Loading...
        </TableCell>
      </TableRow>
    );
  }

  if (!rooms || rooms.data.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={5} className="text-center">
          No rooms found
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {rooms.data.map((room: Room) => (
        <TableRow key={room.id}>
          <TableCell>
            <Link
              href={`/dashboard/transactions/${room.id}`}
              className="hover:text-primary"
            >
              {room.id}
            </Link>
          </TableCell>
          <TableCell>{room.metadata.title || 'Untitled Room'}</TableCell>
          <TableCell>{dateConverter(room.createdAt)}</TableCell>
          <TableCell>{dateConverter(room.lastConnectionAt)}</TableCell>
          <TableCell>
            <div className="flex px-1">
              <Link
                href={`/dashboard/transactions/${room.id}`}
                className="hover:text-primary"
              >
                <BadgesItem roundedMd>View</BadgesItem>
              </Link>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default RoomTable;
