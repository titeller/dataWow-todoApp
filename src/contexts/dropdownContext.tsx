import React, { PropsWithChildren } from 'react';

import { DropdownContextType } from '../@types/dropdown';

export const DropdownContext = React.createContext<DropdownContextType | null>(null);

const DropdownProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <DropdownContext.Provider value={{
    isOpen: true,
    isOpenExist: false
  }}>{children}</DropdownContext.Provider>;
}

export default DropdownProvider;