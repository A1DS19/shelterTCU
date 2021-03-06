import React, { EventHandler } from 'react';
import { FieldInputProps, useField } from 'formik';
import { FormField, Label } from 'semantic-ui-react';

export interface TextInputProps extends FieldInputProps<any> {
  label?: string;
  placeholder?: string;
  value: any;
  type?: 'text' | 'password';
  onChange: EventHandler<any>;
  onBlur: EventHandler<any>;
}

export const TextInput = (props: TextInputProps): JSX.Element => {
  const [field, meta] = useField(props);

  return (
    // '!!' para convertir meta.error en un boolean
    <FormField error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <input {...field} {...props} type={props.type} />
      {meta.touched && meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
};
