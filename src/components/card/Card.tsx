import classes from './Card.module.scss'

type Props = {
  children: React.ReactNode
}

function Card({ children }: Props) {
  return <div className={classes.container}>{children}</div>
}

export default Card
