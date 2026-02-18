export default function LoadingSpinner() {
  return (
    <div className=" flex justify-center items-center min-h-screen ">
      <div className="w-14 h-14 rounded-full border-4 border-slate-400 border-t-white border-b-white animate-spin"></div>
    </div>
  );
}
