import { Model } from 'mongoose'
import { fetchSocialAPI } from '../../src/fetchers/fetcher.social.api'
import TodoRepository from '../../src/repositories/todo.repository'
import FormatTransform from '../../src/factory/formatter.factory'

jest.mock('../../src/factory/formatter.factory')
jest.mock('../../src/fetchers/fetcher.social.api')

describe('todo repository', () => {
  test('find all todos', async () => {
    //@ts-ignore
    Model.find = jest.fn().mockResolvedValue([{ id: '12345' }])
    const todoRepository = TodoRepository.getInstance()
    expect(todoRepository.findAllTodos()).toBeTruthy()
  })

  test('find all todos in channel', async () => {
    //@ts-ignore
    Model.find = jest.fn().mockResolvedValue([{ id: '12345' }])
    // let spy = jest.spyOn(Model, 'find').mockImplementation(() => [{ id: "12345"}]);
    const todoRepository = TodoRepository.getInstance()
    const filter: { [key: string]: string } = { channel: `facebook` }

    expect(todoRepository.findAllTodosInChannel(filter)).toBeTruthy()
    // spy.mockRestore();
  })

  test('find specific todo in channel', async () => {
    //@ts-ignore
    Model.findOne = jest.fn().mockResolvedValue({ username: 'abc' })
    // let spy = jest.spyOn(Model, 'findOne').mockImplementation(() => { username: "abc"});
    const todoRepository = TodoRepository.getInstance()

    expect(todoRepository.findTodoById({ _id: 'facebook_12345' })).toBeTruthy()
    // spy.mockRestore();
  })

  test('find specific todo in channel (have no result)', async () => {
    //@ts-ignore
    Model.findOne = jest.fn().mockResolvedValue(null)
    // let spy = jest.spyOn(Model, 'findOne').mockImplementation(() => { username: "abc"});
    const todoRepository = TodoRepository.getInstance()

    expect(todoRepository.findTodoById({ _id: 'facebook_12345' })).toBeTruthy()
    // spy.mockRestore();
  })

  test('save todo', async () => {
    // const mockmongooseModel = new Model({ id: "12345" })
    Model.prototype.save = jest.fn().mockResolvedValue({ id: '12345' })
    const todoRepository = TodoRepository.getInstance()

    // const mockThisModel = new this._model({username: "abc"})
    // mockThisModel.save = jest.fn().mockReturnValue({ id: "12345" })

    //@ts-ignore
    expect(todoRepository.saveTodo({ _id: 'facebook_12345' })).toBeTruthy()
  })

  test('update todo', async () => {
    Model.updateOne = jest.fn().mockResolvedValue({ id: '12345' })
    const todoRepository = TodoRepository.getInstance()

    FormatTransform.prototype.toUpdateFormat = jest.fn().mockReturnValue('true')

    expect(todoRepository.updateTodo({ _id: 'facebook_12345' }, { username: 'abc' }, 'facebook')).toBeTruthy()
  })

  test('delete todo', async () => {
    Model.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 3 })
    const todoRepository = TodoRepository.getInstance()

    expect(todoRepository.deleteTodo({ _id: 'facebook_12345' })).toBeTruthy()
  })

  test('fetch facebook profile', async () => {
    //@ts-ignore
    fetchSocialAPI.mockReturnValue({ data: { data: '12345' } })
    const todoRepository = TodoRepository.getInstance()

    FormatTransform.prototype.toSaveFormat = jest.fn().mockReturnValue({ _id: 'facebook_12345', id: '12345' })

    expect(todoRepository.getFacebookProfile({ id: '12345', country: 'TH' })).toBeTruthy()
  })

  test('fetch twitter profile (protected)', async () => {
    //@ts-ignore
    fetchSocialAPI.mockReturnValue({ data: { data: { protected: true } } })
    const todoRepository = TodoRepository.getInstance()

    const expectError = new Error(`404 : This todo is protected`)

    expect(todoRepository.getTwitterProfile({ screen_name: '12345', country: 'TH' })).rejects.toThrowError(
      expectError,
    )
  })

  test('fetch twitter profile', async () => {
    //@ts-ignore
    fetchSocialAPI.mockReturnValue({ data: { data: '12345' } })
    const todoRepository = TodoRepository.getInstance()

    FormatTransform.prototype.toSaveFormat = jest.fn().mockReturnValue({ _id: 'twitter_12345', id: '12345' })

    expect(todoRepository.getTwitterProfile({ screen_name: '12345', country: 'TH' })).toBeTruthy()
  })

  test('fetch youtube profile', async () => {
    //@ts-ignore
    fetchSocialAPI.mockReturnValue({ data: { data: '12345' } })
    const todoRepository = TodoRepository.getInstance()

    FormatTransform.prototype.toSaveFormat = jest.fn().mockReturnValue({ _id: 'facebook_12345', id: '12345' })

    expect(todoRepository.getYoutubeProfile({ id: '12345', country: 'TH' })).toBeTruthy()
  })

  test('fetch instagram profile', async () => {
    //@ts-ignore
    fetchSocialAPI.mockReturnValue({ data: { data: '12345' } })
    const todoRepository = TodoRepository.getInstance()

    FormatTransform.prototype.toSaveFormat = jest.fn().mockReturnValue({ _id: 'facebook_12345', id: '12345' })

    expect(todoRepository.getInstagramProfile({ username: '12345', country: 'TH' })).toBeTruthy()
  })
})
