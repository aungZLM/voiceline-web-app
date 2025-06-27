import React from 'react';

export const Input = ({ ...props }) => (
  <input
    className="border p-2 rounded w-full"
    {...props}
  />
);

export const Button = ({ children, ...props }) => (
  <button
    className="text-white px-4 py-2 rounded bg-blue-600 hover:bg-blue-700"
    {...props}
  >
    {children}
  </button>
);
