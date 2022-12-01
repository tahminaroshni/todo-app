import React from 'react';

const Footer = () => {
  return (
    <footer>
      <p
        className='w-5/6 mx-auto p-10 bg-slate-900 text-cyan-600 text-center text-sm rounded-b-lg border-t-cyan-700 border-dashed border-t'
      >&copy; {new Date().getFullYear()} Todo App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;