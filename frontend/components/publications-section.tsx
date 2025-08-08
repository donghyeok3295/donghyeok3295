"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ExternalLink, FileText, Trash2, X, Plus } from "lucide-react"
import { useAdmin } from "@/hooks/useAdmin"

interface PublicationItem {
  id: number
  title: string
  authors: string
  venue: string
  volume?: string
  pages?: string
  year: string
  doi?: string
  paperUrl: string
  image?: string
  location?: string
  date?: string
}

interface PublicationsSectionProps {
  initialCategory?: "Journal" | "Conference" | null
}

export default function PublicationsSection({ initialCategory }: PublicationsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<"Journal" | "Conference">("Journal")
  const [selectedYear, setSelectedYear] = useState("All")
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [publications, setPublications] = useState<PublicationItem[]>([])
  const { isAuthorized } = useAdmin()

  const years = ["All", "2025", "2024", "2023", "2022", "2021", "2020", "2019"]

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newPub, setNewPub] = useState({
    title: "",
    authors: "",
    year: "",
    type: selectedCategory,
    venue: "",
    doi: "",
    paperUrl: "",
    image: ""
  })

  useEffect(() => {
    if (initialCategory && ["Journal", "Conference"].includes(initialCategory)) {
      setSelectedCategory(initialCategory)
    }
  }, [initialCategory])

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/publications?type=${selectedCategory}`)
        const data = await res.json()
        setPublications(data)
      } catch (err) {
        console.error("Error fetching publications:", err)
      }
    }
    fetchPublications()
  }, [selectedCategory])

  const handleDelete = async (id: number) => {
  if (!confirm("정말 삭제하시겠습니까?")) return

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/publications/${id}`, {
      method: "DELETE",
    })

    if (!res.ok) {
      const errorData = await res.json()
      console.warn("삭제 실패:", res.status, errorData)
    }

    // ✅ 어차피 삭제됐으니 UI에서도 반영
    setPublications(prev => prev.filter(pub => pub.id !== id))
  } catch (err) {
    console.error("삭제 요청 중 오류:", err)
  }
}




  const handleAdd = async () => {
    if (!newPub.title || !newPub.authors || !newPub.year) {
      alert("제목, 저자, 연도는 필수입니다.")
      return
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/publications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPub),
      })

      if (!res.ok) {
        const errorText = await res.text()
        console.error("❌ 등록 실패 응답:", errorText)
        alert("등록 실패: 서버 오류")
        return
      }

      const created = await res.json()
      console.log("✅ 등록된 데이터:", created)
      setPublications(prev => [created, ...prev])
      setSelectedYear("All")
      setIsAddModalOpen(false)
      setNewPub({
        title: "",
        authors: "",
        year: "",
        type: selectedCategory,
        venue: "",
        doi: "",
        paperUrl: "",
        image: ""
      })
      alert("등록이 완료되었습니다.")
    } catch (err) {
      console.error("❗ 추가 실패:", err)
      alert("등록 중 오류가 발생했습니다.")
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return

  const formData = new FormData()
  formData.append("image", file)
  formData.append("section", "publications")  // ✅ 섹션 명시

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/upload`, {
      method: "POST",
      body: formData
    })

    const data = await res.json()
    setNewPub(prev => ({ ...prev, image: data.imageUrl }))
  } catch (err) {
    alert("이미지 업로드 실패")
    console.error(err)
  }
}


  const currentPublications = selectedYear === "All"
    ? publications
    : publications.filter((pub) => pub.year === selectedYear)

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Publications</h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto mb-6"></div>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg border border-gray-300 p-1">
            {["Journal", "Conference"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat as "Journal" | "Conference")
                  setSelectedYear("All")
                }}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  selectedCategory === cat ? "bg-blue-700 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Year Filter */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <button
              onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
              className="flex items-center bg-white border border-gray-300 rounded-lg px-6 py-3 text-lg font-medium text-gray-700 hover:bg-gray-50 min-w-32"
            >
              {selectedYear}
              <ChevronDown className={`ml-2 w-5 h-5 transition-transform ${isYearDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isYearDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => {
                      setSelectedYear(year)
                      setIsYearDropdownOpen(false)
                    }}
                    className={`w-full text-left px-6 py-3 hover:bg-gray-50 ${selectedYear === year ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'}`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {isAuthorized && (
          <div className="text-right mb-6">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" /> 논문 추가
            </button>
          </div>
        )}

        {/* List */}
        <div className="space-y-8">
          {currentPublications.map((pub) => (
            <div key={pub.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-40 h-52 bg-gray-100 rounded-lg overflow-hidden border">
                    <img
                      src={`http://localhost:3001${pub.image}`}
                      alt={`${pub.title} paper`}
                      className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setSelectedImage(`http://localhost:3001${pub.image}`)}
                    />

                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-blue-700 mb-2">{pub.title}</h3>
                  <p className="text-gray-600">{pub.authors}</p>
                  <p className="text-gray-600">{pub.venue}</p>
                  <p className="text-gray-600">{pub.year}</p>
                  <div className="flex gap-4 mt-2">
                    <a href={pub.paperUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">링크</a>
                    {isAuthorized && (
                      <button onClick={() => handleDelete(pub.id)} className="text-red-600">삭제</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={selectedImage}
                alt="Paper preview"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          </div>
        )}

        {/* Add Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative">
              <button onClick={() => setIsAddModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-2xl font-bold text-blue-700 mb-4">논문 추가</h3>
              <div className="space-y-4">
                {["title", "authors", "year", "venue", "doi", "paperUrl"].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{field}</label>
                    <input
                      type="text"
                      value={(newPub as any)[field]}
                      onChange={(e) => setNewPub({ ...newPub, [field]: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">image</label>
                  <input type="file" accept="image/*" onChange={handleImageUpload} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">구분</label>
                  <select
                    value={newPub.type}
                    onChange={(e) => setNewPub({ ...newPub, type: e.target.value as "Journal" | "Conference" })}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="Journal">Journal</option>
                    <option value="Conference">Conference</option>
                  </select>
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
      </div>
    </section>
  )
}
