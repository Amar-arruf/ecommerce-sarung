export default function Nav() {
  return (
    <div className="p-5 flex items-center">
      <img src="/logo.png" alt="logo" className="w-[50px] h-auto" />
      <nav className="px-5 ml-auto">
        <ul className="flex items-center gap-y-2 gap-x-8">
          <li className="p-2">Home</li>
          <li className="p-2">Category</li>
          <li className="p-2">About</li>
          <li className="p-2">Sign up</li>
        </ul>
      </nav>
      <button className="bg-green-500 text-white p-3 w-[120px] rounded-lg">
        Sign in
      </button>
    </div>
  );
}
