import { useId } from 'react'
import classes from './Input.module.scss'

type Props = {
  type?: 'text' | 'password'
  label: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

function Input({ type = 'text', label, value, onChange }: Props) {
  const id = useId()

  return (
    <div className={classes.container}>
      <label className={classes.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={classes.input}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default Input
