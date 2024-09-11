import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';

type Task = {
  id: string;
  content: string;
};

type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

type KanbanBoardProps = {
  roomId: string;
  userType: string;
};

const initialColumns: Column[] = [
  { id: 'todo', title: 'To Do', tasks: [] },
  { id: 'inprogress', title: 'In Progress', tasks: [] },
  { id: 'done', title: 'Done', tasks: [] },
];


// Dynamically import react-beautiful-dnd components
const DragDropContext = dynamic(
  () => import('react-beautiful-dnd').then((mod) => mod.DragDropContext),
  { ssr: false }
);
const Droppable = dynamic(
  () => import('react-beautiful-dnd').then((mod) => mod.Droppable),
  { ssr: false }
);
const Draggable = dynamic(
  () => import('react-beautiful-dnd').then((mod) => mod.Draggable),
  { ssr: false }
);

const KanbanBoard: React.FC<KanbanBoardProps> = ({ roomId, userType }) => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  useEffect(() => {
    // TODO: Fetch tasks from the server based on roomId
    // For now, we'll use some dummy data
    setColumns([
      {
        id: 'todo',
        title: 'To Do',
        tasks: [
          { id: 'task1', content: 'Review contract' },
          { id: 'task2', content: 'Schedule property inspection' },
        ],
      },
      {
        id: 'inprogress',
        title: 'In Progress',
        tasks: [{ id: 'task3', content: 'Negotiate terms' }],
      },
      {
        id: 'done',
        title: 'Done',
        tasks: [{ id: 'task4', content: 'Initial property viewing' }],
      },
    ]);
  }, [roomId]);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = columns.find((col) => col.id === source.droppableId);
    const finishColumn = columns.find(
      (col) => col.id === destination.droppableId
    );

    if (startColumn === finishColumn) {
      const newTasks = Array.from(startColumn!.tasks);
      const [reorderedItem] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, reorderedItem);

      const newColumn = {
        ...startColumn!,
        tasks: newTasks,
      };

      setColumns((prevColumns) =>
        prevColumns.map((col) => (col.id === newColumn.id ? newColumn : col))
      );
    } else {
      const startTasks = Array.from(startColumn!.tasks);
      const [movedItem] = startTasks.splice(source.index, 1);
      const newStartColumn = {
        ...startColumn!,
        tasks: startTasks,
      };

      const finishTasks = Array.from(finishColumn!.tasks);
      finishTasks.splice(destination.index, 0, movedItem);
      const newFinishColumn = {
        ...finishColumn!,
        tasks: finishTasks,
      };

      setColumns((prevColumns) =>
        prevColumns.map((col) =>
          col.id === newStartColumn.id
            ? newStartColumn
            : col.id === newFinishColumn.id
              ? newFinishColumn
              : col
        )
      );
    }

    // TODO: Update the server with the new task positions
  };

  const addNewTask = (columnId: string) => {
    const newTask: Task = {
      id: `task${Date.now()}`,
      content: 'New task',
    };

    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId ? { ...col, tasks: [...col.tasks, newTask] } : col
      )
    );

    // TODO: Add the new task to the server
  };

  return (
    <div className="mx-auto max-w-7xl mt-8">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 py-6 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white mb-4">
            Kanban Board for Room {roomId}
          </h4>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex space-x-4">
              {columns.map((column) => (
                <div
                  key={column.id}
                  className="bg-gray-100 dark:bg-boxdark-2 p-4 rounded-lg w-64"
                >
                  <h2 className="font-semibold mb-2 text-black dark:text-white">
                    {column.title}
                  </h2>
                  <Droppable droppableId={column.id}>
                    {(provided: any) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="min-h-[200px]"
                      >
                        {column.tasks.map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided: any) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-white dark:bg-boxdark p-2 mb-2 rounded shadow"
                              >
                                {task.content}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  {userType !== 'viewer' && (
                    <Button
                      onClick={() => addNewTask(column.id)}
                      className="mt-2 w-full"
                    >
                      Add Task
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(KanbanBoard), { ssr: false });
