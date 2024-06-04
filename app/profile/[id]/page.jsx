"use client"

import Profile from "../../../components/Profile"

import { useEffect, useState } from "react"

export default function UserProfile({ params }) {

  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${params.id}`)
        const data = await response.json()
        setUser(data)
      } catch (error) {
        console.log(error)
      }
    }

    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`)
      const data = await response.json()
      setPosts(data)
    }

    if (params.id) {
      fetchUser()
      fetchPosts()
    }
  }, [])

  return (
    <Profile
      name={user?.username}
      desc={`Welcome to ${user?.username}'s profile`}
      data={posts}
      handleEdit
      handleDelete
    />
  )
}