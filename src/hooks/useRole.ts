import { useState, useEffect } from 'react';

export type UserRole = 'creator' | 'brand' | 'big-creator' | 'editor';

export const useRole = () => {
  const [role, setRole] = useState<UserRole>(() => {
    const stored = localStorage.getItem('role');
    return (stored as UserRole) || 'creator';
  });

  const switchRole = (newRole: UserRole) => {
    localStorage.setItem('role', newRole);
    setRole(newRole);
  };

  useEffect(() => {
    localStorage.setItem('role', role);
  }, [role]);

  return { role, switchRole };
};