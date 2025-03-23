import React from 'react'
import Header from '../Components/Header'
import Form from '../Components/Form'
import axios from 'axios'
import ViewButton from '../Components/ViewButton'
import InventaruTable from '../Components/InventaruTable'


export default function CocoInventory() {
  return (
    <div>
      <Header/>
      <ViewButton/>
      <Form/>
      </div>
  )
}
