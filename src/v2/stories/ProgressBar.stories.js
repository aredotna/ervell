import React, { useState, useEffect } from 'react'
import { storiesOf } from '@storybook/react'

import Specimen from 'v2/stories/__components__/Specimen'
import { ProgressBar } from 'v2/components/UI/ProgressBar'

storiesOf('ProgressBar', module).add('default', () => {
  const [randomProgress, setRandomProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(
      () => setRandomProgress(Math.random() * Math.floor(100)),
      500
    )
    return () => clearInterval(timer)
  }, [])

  return (
    <Specimen>
      <ProgressBar progress={33.3} label="Something" />

      <ProgressBar progress={72} label="foobar.jpg" size={59292} />

      <ProgressBar progress={randomProgress} label="foobar.jpg" size={592925} />

      <ProgressBar progress={0} label="Example at 0" />
      <ProgressBar progress={100} label="Example at 100" />
    </Specimen>
  )
})
