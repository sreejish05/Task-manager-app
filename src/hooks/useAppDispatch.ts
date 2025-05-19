import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../features/tasks/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
