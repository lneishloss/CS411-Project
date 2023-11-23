import React from 'react'
import { useEffect, useState } from 'react'

export const Profile = () => {
  const [acc, setAcc] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/api/getOne/655e6a09075f0c8f8aa40b27')
      const json = await response.json()

      if (response.ok) {
        setAcc(json)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <br></br>
      <br></br>
      Profile

      <div>
        {acc ? (
          <>
            <p> Name: {acc.name}</p>
            <p> Age: {acc.age}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}
