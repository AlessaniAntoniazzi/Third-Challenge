import { UserRepository } from "../repository/userRepository"
import UserModel from '../models/models'

jest.mock('../models/models', () => ({
  findOne: jest.fn(),
  create: jest.fn()
}))

describe('UserRepository', () => {
  describe('#verifyPassword', () => {
    describe('when user password is not present', () => {
      it('returns false', async () => {
        const result = await UserRepository.verifyPassword(({ password: null } as any), 'password')

        expect(result).toBe(false)
      })

      it('not call user.comparePassword', async () => {
        const mockComparePassword = jest.fn()

        await UserRepository.verifyPassword(({ password: null, comparePassword: mockComparePassword } as any), 'password')

        expect(mockComparePassword).not.toHaveBeenCalled()
      })
    })

    it('returns false user.comparePassword response is false', async () => {
      const mockComparePassword = jest.fn()
      const user = { password: 'abc', comparePassword: mockComparePassword }

      mockComparePassword.mockResolvedValue(false)

      const result = await UserRepository.verifyPassword((user as any), '123')

      expect(mockComparePassword).toHaveBeenCalled()
      expect(result).toBe(false)
    })

    it('returns true user.comparePassword response is true', async () => {
      const mockComparePassword = jest.fn()
      const user = { password: 'abc', comparePassword: mockComparePassword }

      mockComparePassword.mockResolvedValue(true)

      const result = await UserRepository.verifyPassword((user as any), '123')

      expect(mockComparePassword).toHaveBeenCalled()
      expect(result).toBe(true)
    })
  })

  describe('#findByEmail', () => {
    it('calls UserModel.findOne with email', async () => {
      const email = "email@email.com"

      await UserRepository.findByEmail(
        email
      )

      expect(UserModel.findOne).toHaveBeenCalledWith({ email })
    })
  })

  describe('#createUser', () => {
    it('calls UserModel.create with email', async () => {
      const save = jest.fn();

      (UserModel.create as jest.Mock).mockResolvedValue({
        save
      })

    })
  })
})