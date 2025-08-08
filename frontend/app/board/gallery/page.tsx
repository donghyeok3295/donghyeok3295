"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, X, Plus } from "lucide-react"
import { useAdmin } from "@/hooks/useAdmin"

interface GalleryImage {
  src: string
  caption?: string
}

interface GalleryItem {
  id: number
  title: string
  date: string
  year: string
  thumbnail: string
  images: GalleryImage[]
}

export default function BoardGalleryPage() {
  const { isAuthorized } = useAdmin()
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedYear, setSelectedYear] = useState("ALL")
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newGallery, setNewGallery] = useState({
    title: "",
    date: "",
    year: "",
    thumbnail: "",
    images: [] as GalleryImage[]
  })

  const years = ["ALL", "2025", "2024", "2023"]

  const filteredGallery = selectedYear === "ALL"
    ? galleryItems
    : galleryItems.filter(item => item.year === selectedYear)

  const openModal = (galleryIndex: number) => {
    setSelectedGalleryIndex(galleryIndex)
    setSelectedImageIndex(0)
  }

  const closeModal = () => {
    setSelectedGalleryIndex(null)
    setSelectedImageIndex(0)
  }

  const nextImage = () => {
    if (selectedGalleryIndex !== null) {
      const currentGallery = filteredGallery[selectedGalleryIndex]
      if (currentGallery.images.length > 0) {
        setSelectedImageIndex((selectedImageIndex + 1) % currentGallery.images.length)
      }
    }
  }

  const prevImage = () => {
    if (selectedGalleryIndex !== null) {
      const currentGallery = filteredGallery[selectedGalleryIndex]
      if (currentGallery.images.length > 0) {
        setSelectedImageIndex((selectedImageIndex - 1 + currentGallery.images.length) % currentGallery.images.length)
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedGalleryIndex !== null) {
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'Escape') closeModal()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedGalleryIndex, selectedImageIndex])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/gallery`)
      .then(res => res.json())
      .then(setGalleryItems)
      .catch(err => console.error("갤러리 불러오기 실패:", err))
  }, [])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isThumbnail = false) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("image", file)
    formData.append("section", "gallery")

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/upload`, {
        method: "POST",
        body: formData
      })
      const data = await res.json()
      if (isThumbnail) {
        setNewGallery(prev => ({ ...prev, thumbnail: data.imageUrl }))
      } else {
        setNewGallery(prev => ({ ...prev, images: [...prev.images, { src: data.imageUrl }] }))
      }
    } catch (err) {
      console.error("이미지 업로드 실패:", err)
      alert("이미지 업로드 실패")
    }
  }

  const handleCreateGallery = async () => {
    const { title, date, year, thumbnail, images } = newGallery
    if (!title || !date || !year || !thumbnail || images.length === 0) {
      alert("모든 항목을 입력해주세요.")
      return
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/gallery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGallery)
      })
      const data = await res.json()
      alert("갤러리 등록 완료")
      setGalleryItems(prev => [data, ...prev])
      setNewGallery({ title: "", date: "", year: "", thumbnail: "", images: [] })
      setIsAddModalOpen(false)
    } catch (err) {
      console.error("등록 실패:", err)
      alert("등록 실패")
    }
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Gallery</h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto mb-6"></div>
        </div>

        {isAuthorized && (
          <div className="text-right mb-6">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
            >
              <Plus className="w-4 h-4 mr-2" /> 갤러리 추가
            </button>
          </div>
        )}

        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 bg-white rounded-lg border border-gray-300 p-1">
            {years.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  selectedYear === year ? "bg-blue-700 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => openModal(index)}
            >
              <img
                src={`${process.env.NEXT_PUBLIC_API_BASE}${item.thumbnail}`}
                alt={item.title}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="bg-white py-3 text-center">
                <h3 className="text-base font-bold text-black">{item.title}</h3>
                <p className="text-xs text-gray-700 mt-1">{item.date}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedGalleryIndex !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-6xl max-h-full w-full">
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
              >
                <X className="w-8 h-8" />
              </button>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
              >
                <ChevronLeft className="w-12 h-12" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
              >
                <ChevronRight className="w-12 h-12" />
              </button>
              <div className="flex items-center justify-center h-full">
                <img
                  src={`${process.env.NEXT_PUBLIC_API_BASE}${filteredGallery[selectedGalleryIndex].images[selectedImageIndex]?.src}`}
                  alt=""
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-white">
                <h3 className="text-xl font-bold mb-1">{filteredGallery[selectedGalleryIndex].title}</h3>
                <p className="text-sm opacity-80 mb-1">{filteredGallery[selectedGalleryIndex].date}</p>
                <p className="text-xs opacity-60 mt-2">
                  {selectedImageIndex + 1} / {filteredGallery[selectedGalleryIndex].images.length}
                </p>
              </div>
            </div>
          </div>
        )}

        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative">
              <button onClick={() => setIsAddModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-2xl font-bold text-blue-700 mb-4">새 갤러리 추가</h3>
              <div className="space-y-4">
                {['title', 'date', 'year'].map(field => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{field}</label>
                    <input
                      type={field === 'date' ? 'date' : 'text'}
                      value={(newGallery as any)[field]}
                      onChange={e => setNewGallery({ ...newGallery, [field]: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">썸네일</label>
                  <input type="file" accept="image/*" onChange={e => handleImageUpload(e, true)} />
                  {newGallery.thumbnail && <img src={`${process.env.NEXT_PUBLIC_API_BASE}${newGallery.thumbnail}`} className="w-32 mt-2" />}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">갤러리 이미지</label>
                  <input type="file" accept="image/*" onChange={e => handleImageUpload(e, false)} multiple />
                  <div className="flex flex-wrap mt-2 gap-2">
                    {newGallery.images.map((img, i) => (
                      <div key={i}>
                        <img src={`${process.env.NEXT_PUBLIC_API_BASE}${img.src}`} className="w-24 h-24 object-cover rounded" />
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleCreateGallery}
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
