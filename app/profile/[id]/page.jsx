"use client"

import Profile from "../../../components/Profile"
import ProfileSkeleton from "../../../components/ProfileSkeleton"

import { useEffect, useState } from "react"

export default function UserProfile({ params }) {

  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

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

    try {
      setLoading(true)
      if (params.id) {
        fetchUser()
        fetchPosts()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [])

  if(loading){
    return <ProfileSkeleton />
  }

  return (
    <Profile
      name={`${user?.username}'s`}
      desc={`Welcome to ${user?.username}'s profile`}
      data={posts}
      handleEdit
      handleDelete
    />
  )
}