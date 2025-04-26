import React from 'react'
import { Helmet } from 'react-helmet-async'

function Title({title,description}) {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={description}/>
    </Helmet>
  )
}
Title.defaultProps={
    title:'Hotel',
    description:'Exclusive Packages for Families & Couples!'
}
export default Title