import React from 'react';
import { Checkbox } from '../ui';

export interface FilterCheckboxProps {
  text: string;
  value: string;
  endAdornment?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  cheched?: boolean;
  name?: string;
}

export const FilterCheckbox: React.FC<FilterCheckboxProps> = ({ text, value, endAdornment, onCheckedChange, cheched, name }) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        onCheckedChange={onCheckedChange}
        checked={cheched}
        value={value}
        className='rounded-[8px] w-6 h-6'
        id={`checkbox-${String(name)}-${String(value)}`}
      />
      <label htmlFor={`checkbox-${String(name)}-${String(value)}`} className='leading-none cursor-pointer flex-1'>{text}</label>
      {endAdornment}
    </div>
  );
};