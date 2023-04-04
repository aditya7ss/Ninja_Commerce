import React from 'react'
import './Sort.css'
const Sort = ({setSort,sort}) => {
    // const [sortOrder,setSortOrder]=React.useState()
  return (<div className='containerSelect'>
    <select
    value={sort}
    className='Select'
    onChange={(event) => setSort(event.target.value)}
  >
        <option value="low" className='dsc'>Sort by price: High to Low</option>
        <option value="high" className='asc'>Sort by price: Low to High</option>
  </select>
  </div>
    )

}

export default Sort