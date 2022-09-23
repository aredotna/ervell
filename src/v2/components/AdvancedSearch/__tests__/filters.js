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
    expect(disabledFilters).toEqual({ what: ['USER'] })
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
      what: ['USER'],
      fields: ['DOMAIN', 'URL'],
    })
  })
})
