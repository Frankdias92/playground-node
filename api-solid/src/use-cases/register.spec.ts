import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import InMemoryUsersRepository from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let userRepository: InMemoryUsersRepository
let sud: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sud = new RegisterUseCase(userRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sud.execute({
      name: 'Franklin',
      email: 'frank@email.com',
      password: '123456',
    })
    await expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sud.execute({
      name: 'Franklin',
      email: 'frank@email.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash
    )

    await expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with the same email twice', async () => {
    const email = 'frank@email.com'

    await sud.execute({
      name: 'Franklin',
      email,
      password: '123456',
    })

    expect(() =>
      sud.execute({
        name: 'Franklin',
        email,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
