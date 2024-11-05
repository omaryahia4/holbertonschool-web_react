import React from 'react'
import BodySection from './BodySection';
import './BodySection.css'


export default function BodySectionWithMarginBottom(props) {
  return (
    <div className='bodySectionWithMargin' data-testid="body-section-with-margin">
        <BodySection {...props}/>
    </div>
  );
}
