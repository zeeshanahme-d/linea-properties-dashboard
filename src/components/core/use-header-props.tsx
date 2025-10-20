import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useMemo, useState } from 'react';

interface IProps {
  children: ReactNode;
}
interface HeaderContextType {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  back?: () => void;
  setBack: Dispatch<SetStateAction<(() => void) | undefined>>;
}

const HeaderContext = createContext<HeaderContextType>({
  title: '',
  setTitle: () => { },
  setBack: () => { },
});

export const useHeaderProps = () => useContext(HeaderContext);

export function HeaderPropsProvider({ children }: IProps) {
  const [title, setTitle] = useState('');
  const [back, setBack] = useState<() => void>();

  const value = useMemo(
    () => ({
      title,
      setTitle,
      back,
      setBack,
    }),
    [title, back]
  );

  return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>;
}
