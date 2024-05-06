import { describe, expect, test } from 'vitest'
import { AuthService } from './auth-service'

describe('AuthService', () => {
  describe('login', () => {
    test('should reject when email and password are wrong', () => {
      const loginResult = AuthService.login({
        email: 'wrong@email.com',
        password: 'wrong_password',
      })
      expect(loginResult).rejects.toThrowError('wrong credentials')
    })

    test('should resolve when email and password are valid', () => {
      const loginResult = AuthService.login({
        email: 'user@gmail.com',
        password: 'ohdragon',
      })
      expect(loginResult).resolves.toBe(undefined)
    })
  })
})
