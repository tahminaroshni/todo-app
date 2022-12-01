import React from 'react';
import { DiReact } from "react-icons/di";

const Header = () => {
  return (
    <header className='wrapper flex items-center gap-2 w-5/6 mx-auto p-10 text-3xl bg-slate-900 text-cyan-600 font-semibold rounded-t-lg border-b-cyan-700 border-dashed border-b' >
      <span>
        <DiReact></DiReact>
      </span>
      <h1 className=''>Todo App</h1>
    </header>
  );
};

export default Header;