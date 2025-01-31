const Loader = () => {
  return (
    <div className="flex flex-col  h-screen items-center justify-center bg-white dark:bg-black">
      <h2 className="text-xl py-4">Please wait for a while....</h2>
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default Loader;
