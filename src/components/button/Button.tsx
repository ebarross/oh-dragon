import classes from './Button.module.scss'

type Props = {
  children: React.ReactNode
  type?: 'button' | 'submit'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function Button({ children, type = 'button', onClick }: Props) {
  return (
    <button className={classes.button} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
