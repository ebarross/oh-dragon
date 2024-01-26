type Credentials = {
  email: string
  password: string
}

function login({ email, password }: Credentials): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'ebarros@gmail.com' && password === '2974825') {
        localStorage.setItem('token', 'token-test')
        resolve()
      } else {
        reject()
      }
    }, 500)
  })
}

export default {
  login,
}
