import React from 'react';

const NotAuthorized = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-red-500">Access Forbidden: Admins Only</h1>
    </div>
  );
};

export default NotAuthorized;
