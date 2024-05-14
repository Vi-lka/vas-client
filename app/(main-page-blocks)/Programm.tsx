import { TimelineHorizontal, TimelineHorizontalItem } from '@/components/ui/timeline-horizontal'
import React from 'react'

export default function Programm() {
  return (
    <div id='programm' className='container pt-24'>
      <TimelineHorizontal className='w-full'>
        <TimelineHorizontalItem title='Test 1' time='09:00 – 13:00' />
        <TimelineHorizontalItem title='Test 2' time='13:00 – 14:30' />
        <TimelineHorizontalItem title='Test 3' time='14:00 – 18:00' />
      </TimelineHorizontal>
    </div>
  )
}
