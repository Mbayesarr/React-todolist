import { List } from '@material-ui/core'
import React from 'react'
import ItemTodo from './ItemTodo'

const ListTodo = ({ list }) => {
  return (
    <ul className="list-group">
      {list.map((taskTitle) => (
        <ItemTodo title={taskTitle} />
      ))}
    </ul>
  )
}

export default ListTodo
