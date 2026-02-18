"use client";

import { AccountCircle } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { Controller, Control } from "react-hook-form";

type CustomInputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  config: CustomInputConfig;
};

type CustomInputConfig = {
  name: string;
  label: string;
  type?: string;
  rules?: object;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  showIcon?: boolean;
};

export default function CustomInput({ control, config }: CustomInputProps) {
  return (
    <div className="flex flex-col gap-3">
      <p>{config.label}</p>
      <Controller
        name={config.name}
        control={control}
        rules={config.rules}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            fullWidth
            type={config.type}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            size="small"
            multiline={config.multiline}
            rows={config.rows}
            placeholder={config.placeholder}
            {...(config.showIcon && {
              slotProps: {
                input: {
                  endAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                },
              },
            })}
            onKeyDown={
              config.type === "number"
                ? (e) => {
                    if (["e", "E", "+", "-", "."].includes(e.key))
                      e.preventDefault();
                  }
                : undefined
            }
            sx={{
              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                { display: "none" },
            }}
            onChange={(e) => {
              if (config.type === "number") {
                const val = e.target.value;
                field.onChange(val === "" ? "" : Math.max(0, Number(val)));
              } else {
                field.onChange(e);
              }
            }}
          />
        )}
      />
    </div>
  );
}
