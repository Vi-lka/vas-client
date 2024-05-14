import { TimelineHorizontal, TimelineHorizontalItem } from '@/components/ui/timeline-horizontal'
import React from 'react'

export default function Programm() {
  return (
    <div id='programm' className='container pt-24'>
      <TimelineHorizontal className='w-full pl-2.5 md:pl-0'>
        <TimelineHorizontalItem title='Test 1' description='09:00 – 13:00' />
        <TimelineHorizontalItem title='Test 2' description='13:00 – 14:30' />
        <TimelineHorizontalItem title='Test 3' description='14:00 – 18:00' />
      </TimelineHorizontal>
    </div>
  )
}
