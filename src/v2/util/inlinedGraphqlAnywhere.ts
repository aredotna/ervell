import { DocumentNode } from '@apollo/client'
import {
  argumentsObjectFromField,
  createFragmentMap,
  DirectiveInfo,
  FragmentMap,
  getFragmentDefinitions,
  getMainDefinition,
  isField,
  isInlineFragment,
  resultKeyNameFromField,
  shouldInclude,
} from '@apollo/client/utilities'
import {
  DirectiveNode,
  FieldNode,
  FragmentDefinitionNode,
  InlineFragmentNode,
  SelectionSetNode,
} from 'graphql'

/*
 * This is an inlined version of the propType function
 * exported from the graphql-anywhere package, which
 * had to be removed because of its deprecated apollo
 * dependencies.
 *
 * Here's the last remnants of the function before apollo
 * deleted it from its codebase 🪦:
 * github.com/apollographql/apollo-client/blob/443be94a4258454a24154e6c6fae97978f222f2d/packages/graphql-anywhere/src/utilities.ts
 */

/*
 * Types
 */
type ResultMapper = (
  values: { [fieldName: string]: any },
  rootValue: any
) => any

type FragmentMatcher = (
  rootValue: any,
  typeCondition: string,
  context: any
) => boolean

type ExecOptions = {
  resultMapper?: ResultMapper
  fragmentMatcher?: FragmentMatcher
}

type ExecInfo = {
  isLeaf: boolean
  resultKey: string
  directives: DirectiveInfo
}

type Resolver = (
  fieldName: string,
  rootValue: any,
  args: any,
  context: any,
  info: ExecInfo
) => any

type ExecContext = {
  fragmentMap: FragmentMap
  contextValue: any
  variableValues: VariableMap
  resultMapper: ResultMapper
  resolver: Resolver
  fragmentMatcher: FragmentMatcher
}

type VariableMap = { [name: string]: any }

/*
 * Inlined helper functions
 */

function getDirectiveInfoFromField(
  field: FieldNode,
  variables: Record<string, any>
): DirectiveInfo {
  if (field.directives && field.directives.length) {
    const directiveObj: DirectiveInfo = {}
    field.directives.forEach((directive: DirectiveNode) => {
      directiveObj[directive.name.value] = argumentsObjectFromField(
        directive,
        variables
      )
    })
    return directiveObj
  }
  return null
}

const hasOwn = Object.prototype.hasOwnProperty
function merge(dest, src) {
  if (src !== null && typeof src === 'object') {
    Object.keys(src).forEach(key => {
      const srcVal = src[key]
      if (!hasOwn.call(dest, key)) {
        dest[key] = srcVal
      } else {
        merge(dest[key], srcVal)
      }
    })
  }
}

function executeSubSelectedArray(field, result, execContext) {
  return result.map(item => {
    // null value in array
    if (item === null) {
      return null
    }

    // This is a nested array, recurse
    if (Array.isArray(item)) {
      return executeSubSelectedArray(field, item, execContext)
    }

    // This is an object, run the selection set on it
    return executeSelectionSet(field.selectionSet, item, execContext)
  })
}

function executeField(
  field: FieldNode,
  rootValue: any,
  execContext: ExecContext
): any {
  const { variableValues: variables, contextValue, resolver } = execContext

  const fieldName = field.name.value
  const args = argumentsObjectFromField(field, variables)

  const info: ExecInfo = {
    isLeaf: !field.selectionSet,
    resultKey: resultKeyNameFromField(field),
    directives: getDirectiveInfoFromField(field, variables),
  }

  const result = resolver(fieldName, rootValue, args, contextValue, info)

  // Handle all scalar types here
  if (!field.selectionSet) {
    return result
  }

  // From here down, the field has a selection set, which means it's trying to
  // query a GraphQLObjectType
  if (result == null) {
    // Basically any field in a GraphQL response can be null, or missing
    return result
  }

  if (Array.isArray(result)) {
    return executeSubSelectedArray(field, result, execContext)
  }

  // Returned value is an object, and the query has a sub-selection. Recurse.
  return executeSelectionSet(field.selectionSet, result, execContext)
}

function executeSelectionSet(
  selectionSet: SelectionSetNode,
  rootValue: any,
  execContext: ExecContext
) {
  const { fragmentMap, contextValue, variableValues: variables } = execContext

  const result = {}

  selectionSet.selections.forEach(selection => {
    if (variables && !shouldInclude(selection, variables)) {
      // Skip selection sets which we're able to determine should not be run
      return
    }

    if (isField(selection)) {
      const fieldResult = executeField(selection, rootValue, execContext)

      const resultFieldKey = resultKeyNameFromField(selection)

      if (fieldResult !== undefined) {
        if (result[resultFieldKey] === undefined) {
          result[resultFieldKey] = fieldResult
        } else {
          merge(result[resultFieldKey], fieldResult)
        }
      }
    } else {
      let fragment: InlineFragmentNode | FragmentDefinitionNode

      if (isInlineFragment(selection)) {
        fragment = selection
      } else {
        // This is a named fragment
        fragment = fragmentMap[selection.name.value]

        if (!fragment) {
          throw new Error(`No fragment named ${selection.name.value}`)
        }
      }

      const typeCondition = fragment.typeCondition.name.value

      if (execContext.fragmentMatcher(rootValue, typeCondition, contextValue)) {
        const fragmentResult = executeSelectionSet(
          fragment.selectionSet,
          rootValue,
          execContext
        )

        merge(result, fragmentResult)
      }
    }
  })

  if (execContext.resultMapper) {
    return execContext.resultMapper(result, rootValue)
  }

  return result
}

function graphql(
  resolver: Resolver,
  document: DocumentNode,
  rootValue?: any,
  contextValue?: any,
  variableValues: VariableMap = {},
  execOptions: ExecOptions = {}
) {
  const mainDefinition = getMainDefinition(document)

  const fragments = getFragmentDefinitions(document)
  const fragmentMap = createFragmentMap(fragments)

  const resultMapper = execOptions.resultMapper

  // Default matcher always matches all fragments
  const fragmentMatcher = execOptions.fragmentMatcher || (() => true)

  const execContext: ExecContext = {
    fragmentMap,
    contextValue,
    variableValues,
    resultMapper,
    resolver,
    fragmentMatcher,
  }

  return executeSelectionSet(
    mainDefinition.selectionSet,
    rootValue,
    execContext
  )
}

export function check(
  doc: DocumentNode,
  data: any,
  variables: VariableMap = {}
): void {
  const resolver = (
    // @ts-ignore
    fieldName: string,
    root: any,
    // @ts-ignore
    args: any,
    // @ts-ignore
    context: any,
    info: any
  ) => {
    if (!{}.hasOwnProperty.call(root, info.resultKey)) {
      throw new Error(`${info.resultKey} missing on ${JSON.stringify(root)}`)
    }
    return root[info.resultKey]
  }

  graphql(resolver, doc, data, {}, variables, {
    fragmentMatcher: () => false,
  })
}

const ANONYMOUS = '<<anonymous>>'

const reactPropTypeLocationNames = {
  prop: 'prop',
  context: 'context',
  childContext: 'child context',
}

function PropTypeError(message) {
  this.message = message
  this.stack = ''
}
// Make `instanceof Error` still work for returned errors.
PropTypeError.prototype = Error.prototype

function createChainableTypeChecker(validate) {
  function checkType(
    isRequired,
    props,
    propName,
    componentName,
    location,
    propFullName
  ) {
    componentName = componentName || ANONYMOUS
    propFullName = propFullName || propName
    if (props[propName] == null) {
      const locationName = reactPropTypeLocationNames[location]
      if (isRequired) {
        if (props[propName] === null) {
          return new PropTypeError(
            `The ${locationName} \`${propFullName}\` is marked as required ` +
              `in \`${componentName}\`, but its value is \`null\`.`
          )
        }
        return new PropTypeError(
          `The ${locationName} \`${propFullName}\` is marked as required in ` +
            `\`${componentName}\`, but its value is \`undefined\`.`
        )
      }
      return null
    } else {
      return validate(props, propName, componentName, location, propFullName)
    }
  }

  const chainedCheckType = checkType.bind(null, false)
  chainedCheckType.isRequired = checkType.bind(null, true)

  return chainedCheckType
}

/*
 * Final function
 */

export function propType(
  doc: DocumentNode,
  mapPropsToVariables = props => props
) {
  return createChainableTypeChecker((props, propName) => {
    const prop = props[propName]
    try {
      if (!prop.loading) {
        check(doc, prop, mapPropsToVariables(props))
      }
      return null
    } catch (e) {
      // Need a much better error.
      // Also we aren't checking for extra fields
      return e
    }
  })
}
