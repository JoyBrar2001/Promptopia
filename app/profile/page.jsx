"use client"

import Profile from "../../components/Profile";
import ProfileSkeleton from "../../components/ProfileSkeleton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { data: session } = useSession()
  const router = useRouter()

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`)
      const data = await response.json()
      setPosts(data)
      console.log(data);
    }

    try {
      setLoading(true)
      if (session?.user?.id){
        fetchPosts()
      } 
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }

  }, [session?.user?.id])

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt ? ")
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE"
        })

        const filteredPosts = posts.filter(p => p._id !== post._id)
        setPosts(filteredPosts)
      } catch (error) {
        console.log(error)
      }
    }
  }

  if(loading){
    return <ProfileSkeleton />
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}