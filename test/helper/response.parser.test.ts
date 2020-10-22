import parseResponse from '../../src/helper/response.parser'

describe('Response parser', () => {
  test('should return success format when pass data', () => {
    const data = `200 : Page already exists in database, country: TH`
    const expectResponse = {
      success: {
        code: 200,
        message: `200 : Page already exists in database, country: TH`,
      },
    }

    let response = parseResponse(data)
    expect(response).toEqual(expectResponse)
  })

  test('should return error format when pass data', () => {
    const data = new Error(`400 : Invalid input, Please input field id and country`)
    const expectResponse = {
      error: {
        code: 400,
        message: `400 : Invalid input, Please input field id and country`,
      },
    }

    let response = parseResponse(data)
    expect(response).toEqual(expectResponse)
  })
})
