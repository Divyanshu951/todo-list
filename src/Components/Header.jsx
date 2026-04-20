function Header() {
  return (
    <header className="font-heading relative flex h-[20vh] items-center justify-center overflow-hidden bg-[url('https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1345&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center shadow-2xl">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      <h1 className="relative text-6xl font-bold tracking-widest text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] md:text-8xl">
        TODO LIST
      </h1>
      <div className="absolute bottom-0 h-10 w-full bg-linear-to-t from-stone-950 to-transparent"></div>
    </header>
  );
}

export default Header;
