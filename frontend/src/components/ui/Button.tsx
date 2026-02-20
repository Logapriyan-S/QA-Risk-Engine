import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
}

export default function Button({ children, variant = 'primary', icon, className = '', ...props }: ButtonProps) {
  const baseStyles = "flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20 hover:opacity-90",
    secondary: "bg-zinc-800 text-white hover:bg-zinc-700",
    outline: "bg-transparent border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}