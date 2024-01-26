import classes from './Button.module.scss'

type Props = {
  children: React.ReactNode
  type?: 'button' | 'submit'
}

function Button({ children, type = 'button' }: Props) {
  return (
    <button className={classes.button} type={type}>
      {children}
    </button>
  )
}

export default Button
