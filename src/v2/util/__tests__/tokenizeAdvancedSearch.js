import tokenizeSearch from 'v2/util/tokenizeAdvancedSearch'

describe('tokenizeSearch', () => {
  it('should tokenize a search query', () => {
    const query = 'hello world'
    const tokens = tokenizeSearch(query)
    expect(tokens.term).toEqual({ facet: 'hello world' })
  })

  it('should split out valid tokens with : into key/value pairs', () => {
    const query =
      'hello world where:following where:my what:image what:text fields:domain fields:url'
    const tokens = tokenizeSearch(query)
    expect(tokens.term).toEqual({ facet: 'hello world' })
    expect(tokens.where).toEqual({ facets: ['FOLLOWING', 'MY'] })
    expect(tokens.what).toEqual({ facets: ['IMAGE', 'TEXT'] })
    expect(tokens.fields).toEqual({ facets: ['DOMAIN', 'URL'] })
  })

  it('should ignore invalid tokens', () => {
    const query = 'hello world where:following where:my where:foo'
    const tokens = tokenizeSearch(query)
    expect(tokens.term).toEqual({ facet: 'hello world' })
    expect(tokens.where).toEqual({ facets: ['FOLLOWING', 'MY'] })
  })

  it('should filter out key value pairs that do not correspond to anything', () => {
    const query = 'hello:world hello:world:world'
    const tokens = tokenizeSearch(query)
    expect(tokens.term).toEqual({ facet: '' })
  })

  it('should handle per and page values', () => {
    const query = 'hello per:5 page:1 hello world'
    const tokens = tokenizeSearch(query)
    expect(tokens.term).toEqual({ facet: 'hello hello world' })
    expect(tokens.page).toEqual(1)
    expect(tokens.per).toEqual(5)
  })

  it('should not add a value for any filter or facet when not present', () => {
    const query = 'hello hello world'
    const tokens = tokenizeSearch(query)
    expect(tokens.term).toEqual({ facet: 'hello hello world' })
    expect(tokens.page).toEqual(1)
    expect(tokens.per).toEqual(undefined)
    expect(tokens.where).toEqual(undefined)
    expect(tokens.what).toEqual(undefined)
    expect(tokens.fields).toEqual(undefined)
  })
})
