import { TableData } from './types'

export function getInitialExpandedState(
  blocks: Array<TableData>
): Record<string, boolean> {
  const record = {}
  blocks.forEach(block => {
    if ('__typename' in block && block.connection) {
      record[`${block.id.toString()}`] = block.connection.selected
    }
  })

  return record
}
