type Credentials = {
  email: string
  password: string
}

function login({ email, password }: Credentials): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'user@gmail.com' && password === 'ohdragon') {
        localStorage.setItem('token', 'token-test')
        resolve()
      } else {
        reject()
      }
    }, 500)
  })
}

function isUserLogged() {
  return Boolean(localStorage.getItem('token'))
}

export default {
  login,
  isUserLogged,
}
