import { useId } from 'react'
import classes from './Input.module.scss'

type Props = {
  label: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  type?: 'text' | 'password'
  required?: boolean
}

function Input({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
}: Props) {
  const id = useId()

  return (
    <div className={classes.container}>
      <label className={classes.label} htmlFor={id}>
        {label}
        {required && <span className={classes.required}> *</span>}
      </label>
      <input
        className={classes.input}
        type={type}
        id={id}
        value={value}
        required={required}
        onChange={onChange}
      />
    </div>
  )
}

export default Input
