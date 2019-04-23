declare module '*.png' {
  const content: any
  export default content
}

declare module '*.svg' {
  const content: any
  export default content
}

declare global {
  interface Window {
    __APOLLO_CLIENT__: any
    __APOLLO_STATE__: any
  }
}

export {}
