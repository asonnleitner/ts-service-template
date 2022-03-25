import indexFile from '~/index'

describe('index', () => {
  it('should export a function', () => {
    console.log({ indexFile })
    expect(typeof indexFile).toBe('function')
  })
})
