import React from "react";
import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  variant?: "outlined" | "standard" | undefined;
  error?: boolean;
  helperText?: string;
  inputRef?: React.Ref<any>;
  onKeyDown?:
    | React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
}

export default function PasswordField({
  id,
  label,
  value,
  onChange,
  variant = "standard",
  error,
  helperText,
  inputRef,
  onKeyDown,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <FormControl error={error} fullWidth variant={variant}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      {variant === "standard" ? (
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          inputRef={inputRef}
          onKeyDown={onKeyDown}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      ) : (
        <OutlinedInput
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          inputRef={inputRef}
          onKeyDown={onKeyDown}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label={label}
        />
      )}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
