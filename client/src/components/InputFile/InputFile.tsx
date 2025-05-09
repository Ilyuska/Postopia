import { ChangeEvent, FC } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import styles from './styles.module.scss';

type InputFileProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  styles?: string; // Переименовано для ясности
} & Omit<TextFieldProps, 'onChange' | 'type'>; // Исключаем onChange и type, так как они переопределены

const InputFile: FC<InputFileProps> = ({ onChange, styles, ...rest }) => {
  return (
    <TextField
      margin="dense"
      type="file"
      fullWidth
      variant="outlined"
      name="image"
      onChange={onChange}
      className={styles} // Используем переданный className
      {...rest} // Передаем все остальные пропсы
    />
  );
};

export default InputFile;