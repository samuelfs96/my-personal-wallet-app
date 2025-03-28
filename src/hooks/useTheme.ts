import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toggleDarkMode } from '@/store/slices/themeSlice';
import { useEffect } from 'react';

export const useTheme = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const handleOnChangeTheme = () => {
    dispatch(toggleDarkMode());
  };

  return {
    isDarkMode,
    handleOnChangeTheme,
  };
};
