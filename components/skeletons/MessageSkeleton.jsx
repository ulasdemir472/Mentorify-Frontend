const MessageSkeleton = () => {
  return (
    <>
      <div className="flex gap-3 items-center">
        <div className="flex flex-col gap-1">
          <div className="h-5 w-80 bg-gray-300"></div>
          <div className="h-5 w-80 bg-gray-300"></div>
        </div>
      </div>
      <div className="flex gap-3 items-center justify-end">
        <div className="flex flex-col gap-1">
          <div className="h-5 w-80 bg-gray-300"></div>
          <div className="h-5 w-80 bg-gray-300"></div>
        </div>
      </div>
    </>
  );
};
export default MessageSkeleton;
