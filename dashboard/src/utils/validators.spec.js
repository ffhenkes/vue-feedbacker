import {
  validateEmptyAndEmail,
  validateEmptyAndLength3
} from './validators'

describe('Validators utils', () => {
  it('shouldValidateEmptyPayload', () => {
    expect(validateEmptyAndLength3()).toBe('*This field is required')
  })

  it('shouldValidateLessThan3Characters', () => {
    expect(validateEmptyAndLength3('be')).toBe('*This field requires at least 3 characters')
  })

  it('shouldPassWhenLengthEqualOrAbove3', () => {
    expect(validateEmptyAndLength3('abc')).toBe(true)
  })

  it('shouldValidateEmptyEmail', () => {
    expect(validateEmptyAndEmail()).toBe('*This field is required')
  })

  it('shouldValidateRealEmail', () => {
    expect(validateEmptyAndEmail('whatever@.')).toBe('*This field needs to be an e-mail')
  })

  it('shouldPassWhenRealEmail', () => {
    expect(validateEmptyAndEmail('whatever@whatever.com')).toBe(true)
  })
})