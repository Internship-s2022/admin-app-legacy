import React from 'react';

export interface ModalProps {
  children: JSX.Element;
  testId: string;
  isOpen: boolean;
  styles?: string;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  selectedValue?: string;
}
