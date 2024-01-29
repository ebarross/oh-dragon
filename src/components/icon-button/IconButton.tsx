import classes from './IconButton.module.scss'

type Variant = 'primary' | 'secondary' | 'danger'

type Props = {
  children: React.ReactNode
  label: string
  variant: Variant
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function IconButton({ children, label, variant, onClick }: Props) {
  const variantClass: Record<Variant, string> = {
    primary: classes.primary,
    secondary: classes.secondary,
    danger: classes.danger,
  }

  return (
    <button
      className={`${classes.button} ${variantClass[variant]}`}
      title={label}
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default IconButton
