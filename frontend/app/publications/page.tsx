"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import PublicationsSection from "@/components/publications-section"

export default function PublicationsPage() {
  const searchParams = useSearchParams()
  const [category, setCategory] = useState<string | null>(null)

  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      setCategory(categoryParam)
    }
  }, [searchParams])

  return <PublicationsSection initialCategory={category} />
}