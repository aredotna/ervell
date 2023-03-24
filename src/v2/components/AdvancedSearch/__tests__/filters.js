import { getDisabledFilters } from '../utils/filters'

describe('AdvancedSearch filters', () => {
  it('should return an empty array when no filters are disabled', () => {
    const disabledFilters = getDisabledFilters({}, 'hello world')
    expect(disabledFilters).toEqual({})
  })

  it('should return an object of disabled filters', () => {
    const disabledFilters = getDisabledFilters(
      {
        where: [{ facet: 'MY' }],
      },
      'hello world'
    )
    expect(disabledFilters).toEqual({ what: ['USER', 'GROUP'] })
  })

  it('should return an object of disabled filters when multiple filters are disabled', () => {
    const disabledFilters = getDisabledFilters(
      {
        where: [{ facet: 'MY' }],
        what: { facets: ['CHANNEL'] },
      },
      'hello world'
    )
    expect(disabledFilters).toEqual({
      what: ['USER', 'GROUP'],
      fields: ['DOMAIN', 'URL', 'CONTENT'],
    })
  })

  it('should return an object of disabled filters when query is empty', () => {
    const disabledFilters = getDisabledFilters({}, '')
    expect(disabledFilters).toEqual({
      what: ['USER'],
    })
  })
})
