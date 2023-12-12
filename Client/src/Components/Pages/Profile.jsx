import React from 'react'
import { useEffect, useState } from 'react'
import { useUserContext } from '../../UserContext';

export const Profile = () => {
  const [acc, setAcc] = useState(null);
  const { userEmail } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/api/getOne/' + userEmail)
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
            <p> Email: {acc.email}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}
