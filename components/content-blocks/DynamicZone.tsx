import type { DynamicZoneT } from '@/lib/types/additionalPage'
import React from 'react'
import TextBlock from './TextBlock';
import ImageSliderBlock from './ImageSliderBlock';
import FilesBlock from './FilesBlock';

export default function DynamicZone({
  item,
}: {
  item: DynamicZoneT,
}) {
  switch (item.__typename) {
    case "ComponentContentTextBlock":
      return <TextBlock data={item} className=''/>;

    case "ComponentContentImageSlider":
      return <ImageSliderBlock data={item} className=''/>;

    case "ComponentContentFiles":
      return <FilesBlock data={item} className=''/>;
  
    default:
      return null;
  }
}
