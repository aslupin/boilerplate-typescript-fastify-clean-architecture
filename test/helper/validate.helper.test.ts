import * as Validator from '../../src/helper/validate.helper'
import { rawDataUpdateTodoDTO } from '../../src/entities/dtos/facebook.dto'
describe('Validator', () => {

  test('Should return boolean when call function validCheckInput', () => {
    const expectedData = false
    expect(Validator.validCheckInput('141108613290', 'FR')).toBe(expectedData)
  })

  test('Should return boolean when call function validCheckInput', () => {
    const expectedData = true
    expect(Validator.validCheckInput('141108613290', 'MY')).toBe(expectedData)
  })

  test('Should return boolean when call function validCheckID', () => {
    const expectedData = false
    expect(Validator.validCheckID(null)).toBe(expectedData)
  })

  test('Should return boolean when call function validCheckID', () => {
    const expectedData = true
    expect(Validator.validCheckID('141108613290')).toBe(expectedData)
  })

  test('Should return boolean when call function isNotValidField', () => {
    const expectedData = false
    expect(Validator.isNotValidField({ score: { field: 'score', type: 'spider' } }, 'score')).toBe(expectedData)
  })

  test('Should return boolean when call function isNotValidField', () => {
    const expectedData = true
    expect(Validator.isNotValidField({ score: { field: 'score', type: 'spider' } }, 'username')).toBe(expectedData)
  })

  test('Should return follow expect when call function validUpdatedFields', () => {
    const expectData = ['language']
    const rawData: rawDataUpdateTodoDTO = {
      tier: 500,
      persistent: false,
      country: 'MY',
      // @ts-ignore
      language: 'zsm',
    }

    const result = Validator.validUpdatedFields('facebook', rawData)
    expect(result).toEqual(expectData)
  })
})
