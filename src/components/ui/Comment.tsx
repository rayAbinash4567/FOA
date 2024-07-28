import { cn } from '@/lib/utils';
import { BaseMetadata } from '@liveblocks/client';
import { ThreadData } from '@liveblocks/node';
import { useIsThreadActive } from '@liveblocks/react-lexical';
import { Composer, Thread } from '@liveblocks/react-ui';
import { useThreads } from '@liveblocks/react/suspense';

declare type ThreadWrapperProps = { thread: ThreadData<BaseMetadata> };
const ThreadWrapper = ({ thread }: ThreadWrapperProps) => {
  const isActive = useIsThreadActive(thread.id);

  return (
    <Thread
      thread={thread}
      data-state={isActive ? 'active' : null}
      className={cn(
        'comment-thread border',
        isActive && '!border-pink-900 shadow-md',
        thread.resolved && 'opacity-40'
      )}
    />
  );
};

const Comments = () => {
  const { threads } = useThreads();

  return (
    <div className="bg-white ">
      <Composer className="" />

      {threads.map((thread) => (
        <ThreadWrapper key={thread.id} thread={thread} />
      ))}
    </div>
  );
};

export default Comments;
