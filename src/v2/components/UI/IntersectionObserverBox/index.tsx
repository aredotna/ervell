import React, { useEffect, useRef } from 'react'

/* From: https://github.com/tvler/arena-next/blob/51a283ada14244b6be69db8d738a2f59b4335efa/components/IntersectionObserverBox.tsx
 *
 * A type-safe, polymorphic Box to wrap any forwardRef component
 * with an Intersection Observer. Designed to be used in an
 * unknown-length array map setting (infinite feed, etc.).
 *
 * The `callback` prop is closed over the passed-in `id` prop.
 * This allows the `callback` prop to keep reference-equality
 * between renders using something like `useCallback`, which
 * greatly improves performance. This would be impossible to
 * achieve if you were in a variadic array map unless you had
 * a hacky ref setup otherwise.
 *
 * Ex:
 *   Component to receive the Intersection Observer:
 *
 *   const Button = forwardRef<HTMLButtonElement, ButtonProps>(
 *    (props, ref) => {
 *      return (
 *        <button ref={ref} {...props} />
 *      );
 *    }
 *   );
 *
 *   // Then, in the parent component's code:
 *
 *   const componentProps: ButtonProps = { onClick: () => {} };
 *   const callback: useCallback((id) => (entries) => {})
 *
 *   <IntersectionObserverBox
 *     component={Button}
 *     componentProps={componentProps}
 *     callback={callback}
 *     skip={false}
 *     id="Some identifier"
 *   />
 */

type IntersectionObserverBoxProps<
  RefType extends Element,
  IDType,
  ComponentProps
> = {
  componentProps: ComponentProps
  options?: IntersectionObserverInit
  Component: React.ComponentType<
    ComponentProps & {
      ref: React.Ref<RefType>
    }
  >
  id: IDType
  callback: (id: IDType) => IntersectionObserverCallback
  skip?: boolean
}

export function IntersectionObserverBox<
  RefType extends HTMLElement,
  IDType,
  ComponentProps
>({
  options,
  Component,
  id,
  callback,
  skip = false,
  componentProps,
}: IntersectionObserverBoxProps<RefType, IDType, ComponentProps>): JSX.Element {
  const componentRef = useRef<RefType>(null)

  useEffect(() => {
    let observer: IntersectionObserver | undefined

    if (!skip && componentRef.current) {
      observer = new window.IntersectionObserver(callback(id), options)
      observer.observe(componentRef.current)
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [callback, id, options, skip])

  return <Component {...componentProps} ref={componentRef} />
}
