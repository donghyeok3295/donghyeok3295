"use client"

import React, { useEffect, useState } from "react"
import { Calendar, User, ArrowRight, Trash2, Plus, X } from "lucide-react"
import NewsModal from "./news-modal"
import { useAdmin } from "@/hooks/useAdmin"

interface NewsItem {
  id: number
  title: string
  summary: string
  date: string
  author: string
  category: string
  featured: boolean
  image?: string
  content?: string
}

export default function NewsSection() {
  const { isAuthorized } = useAdmin()
  const [news, setNews] = useState<NewsItem[]>([])
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newNews, setNewNews] = useState({
    title: "",
    summary: "",
    date: "",
    author: "",
    category: "",
    image: ""
  })

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/news`)
      .then(res => res.json())
      .then(data => setNews(data))
      .catch(err => {
        console.error("뉴스 데이터를 불러오지 못했습니다:", err)
      })
  }, [])

  const handleNewsClick = (newsItem: NewsItem) => {
    setSelectedNews(newsItem)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedNews(null)
    setIsModalOpen(false)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/news/${id}`, {
        method: "DELETE"
      })
      if (res.ok) {
        setNews(prev => prev.filter(n => n.id !== id))
      } else {
        alert("삭제 실패")
      }
    } catch (err) {
      console.error("삭제 실패:", err)
    }
  }

  const handleAdd = async () => {
    if (!newNews.title || !newNews.summary || !newNews.date || !newNews.author || !newNews.category) {
      alert("모든 필드를 입력해주세요.")
      return
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/news`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNews),
        credentials: "include"
      })
      const result = await res.json()
      if (res.ok) {
        setNews(prev => [result, ...prev])
        setNewNews({ title: "", summary: "", date: "", author: "", category: "", image: "" })
        setIsAddModalOpen(false)
      } else {
        alert("등록 실패")
        console.error(result)
      }
    } catch (err) {
      console.error("등록 에러:", err)
      alert("서버 오류 발생")
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
formData.append("image", file)
formData.append("section", "news") // ✅ 이거 꼭 필요

await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/upload`, {
  method: "POST",
  body: formData,
})


    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/upload?section=news`, {
        method: "POST",
        body: formData
      })
      const data = await res.json()
      setNewNews(prev => ({ ...prev, image: data.imageUrl }))
    } catch (err) {
      alert("이미지 업로드 실패")
      console.error(err)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "수상": return "bg-yellow-100 text-yellow-800"
      case "연구": return "bg-blue-100 text-blue-800"
      case "논문": return "bg-green-100 text-green-800"
      case "행사": return "bg-purple-100 text-purple-800"
      case "모집": return "bg-red-100 text-red-800"
      case "특허": return "bg-indigo-100 text-indigo-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const sortedNews = [...news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">News & Updates</h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto mb-6"></div>
        </div>

        {isAuthorized && (
          <div className="text-right mb-6">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
            >
              <Plus className="w-4 h-4 mr-2" /> 뉴스 추가
            </button>
          </div>
        )}

        <div className="space-y-6">
          {sortedNews.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer relative"
              onClick={() => handleNewsClick(item)}
            >
              {isAuthorized && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(item.id)
                  }}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}

              <div className="flex flex-col md:flex-row md:items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium mr-3 ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {item.date}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-blue-700 mb-3">{item.title}</h4>
                  <p className="text-gray-600 mb-2">{item.summary}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="w-4 h-4 mr-1" />
                    {item.author}
                  </div>


                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                  <button className="flex items-center text-blue-700 hover:text-blue-800 font-medium">
                    자세히 보기
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold text-blue-700 mb-4">뉴스 추가</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
                <input
                  type="text"
                  value={newNews.title}
                  onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">요약</label>
                <input
                  type="text"
                  value={newNews.summary}
                  onChange={(e) => setNewNews({ ...newNews, summary: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">작성자</label>
                <input
                  type="text"
                  value={newNews.author}
                  onChange={(e) => setNewNews({ ...newNews, author: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">날짜</label>
                <input
                  type="date"
                  value={newNews.date}
                  onChange={(e) => setNewNews({ ...newNews, date: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
                <select
                  value={newNews.category}
                  onChange={(e) => setNewNews({ ...newNews, category: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">-- 카테고리 선택 --</option>
                  <option value="수상">수상</option>
                  <option value="연구">연구</option>
                  <option value="논문">논문</option>
                  <option value="행사">행사</option>
                  <option value="모집">모집</option>
                  <option value="특허">특허</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이미지</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
              </div>
              <button
                onClick={handleAdd}
                className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800"
              >
                등록하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ 자세히 보기 모달 */}
      {selectedNews && isModalOpen && (
      <NewsModal
  newsItem={selectedNews}
  isOpen={isModalOpen}
  onClose={handleCloseModal}
/>

      )}
    </section>
  )
}
