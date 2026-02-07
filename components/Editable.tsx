import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { Edit2, Check, X } from 'lucide-react';

interface EditableProps {
  path: string;
  value: string;
  multiline?: boolean;
  className?: string;
}

export const EditableText: React.FC<EditableProps> = ({ path, value, multiline = false, className = "" }) => {
  const { isAdmin, updateContent } = useCms();
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  if (!isAdmin) return <span className={`whitespace-pre-line ${className}`}>{value}</span>;

  const handleSave = () => {
    updateContent(path, localValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalValue(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={`relative inline-block w-full group ${className}`}>
        {multiline ? (
          <textarea
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            className="w-full bg-white text-scout-dark p-2 border-2 border-scout-accent rounded-lg outline-none min-h-[100px]"
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            className="w-full bg-white text-scout-dark p-2 border-2 border-scout-accent rounded-lg outline-none"
            autoFocus
          />
        )}
        <div className="absolute top-0 right-0 flex space-x-1 -translate-y-full pb-1">
          <button onClick={handleSave} className="p-1 bg-green-500 text-white rounded hover:bg-green-600 shadow-sm"><Check size={12} /></button>
          <button onClick={handleCancel} className="p-1 bg-red-500 text-white rounded hover:bg-red-600 shadow-sm"><X size={12} /></button>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => setIsEditing(true)}
      className={`relative inline-block group cursor-pointer border-2 border-dashed border-transparent hover:border-scout-accent/30 rounded px-1 -mx-1 transition-all whitespace-pre-line ${className}`}
    >
      {value}
      <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity translate-x-1/2 -translate-y-1/2 bg-scout-accent text-white p-1 rounded-full">
        <Edit2 size={10} />
      </div>
    </div>
  );
};

export const EditableImage: React.FC<{ path: string; src: string; className?: string }> = ({ path, src, className }) => {
  const { isAdmin, updateContent } = useCms();

  const handleChange = () => {
    const newUrl = prompt("Enter the URL for the new image:", src);
    if (newUrl) updateContent(path, newUrl);
  };

  return (
    <div className={`relative group ${className}`}>
      <img src={src} className="w-full h-full object-cover" alt="Editable" />
      {isAdmin && (
        <button 
          onClick={handleChange}
          className="absolute inset-0 bg-scout-accent/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm cursor-pointer"
        >
          <div className="bg-white text-scout-dark px-4 py-2 rounded-xl font-bold text-xs shadow-xl flex items-center space-x-2">
            <Edit2 size={12} />
            <span>Change Image URL</span>
          </div>
        </button>
      )}
    </div>
  );
};