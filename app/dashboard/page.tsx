import { UserButton } from '@clerk/nextjs';
const page = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <h1>Dashboard</h1>

      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default page;
