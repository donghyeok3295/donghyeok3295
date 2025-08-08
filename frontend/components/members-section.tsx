"use client"

import { useEffect, useState } from "react"
import { Mail, GraduationCap, Trash2, Plus, X } from "lucide-react"
import { useAdmin } from "@/hooks/useAdmin"

interface Member {
  id: number
  name: string
  email: string
  image: string
  research: string
  github?: string
  graduation?: string
  current_position?: string
  role: string
}

interface Props {
  role?: "professor" | "researcher" | "graduate"
}

export default function MembersSection({ role }: Props) {
  const [members, setMembers] = useState<Member[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    research: "",
    image: "",
    github: "",
    graduation: "",
    current_position: ""
  })
  const { isAuthorized } = useAdmin()

  const professor = { /* 생략 */ }

  useEffect(() => {
    if (role === "researcher" || role === "graduate") {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE}/members?role=${role}`)
        .then((res) => res.json())
        .then((data) => setMembers(data))
        .catch((err) => console.error("멤버 불러오기 실패:", err))
    }
  }, [role])

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/members/${id}`, {
      method: "DELETE"
    })
    setMembers(prev => prev.filter(m => m.id !== id))
  }

  const handleAdd = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/members/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newMember, role })
      })
      const data = await res.json()
      setMembers(prev => [data, ...prev])
      setIsAddModalOpen(false)
      setNewMember({
        name: "",
        email: "",
        research: "",
        image: "",
        github: "",
        graduation: "",
        current_position: ""
      })
    } catch (err) {
      alert("등록 실패")
      console.error(err)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("image", file)
    formData.append("section", "members")

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/upload`, {
        method: "POST",
        body: formData
      })
      const data = await res.json()
      setNewMember(prev => ({ ...prev, image: data.imageUrl }))
    } catch (err) {
      alert("이미지 업로드 실패")
      console.error(err)
    }
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">
            {role === "researcher"
              ? "Researchers"
              : role === "graduate"
              ? "IST Alumni"
              : "Professor"}
          </h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto mb-6"></div>
        </div>

        {(role === undefined || role === "professor") && <></>}

        {(role === "researcher" || role === "graduate") && (
          <>
            {isAuthorized && (
              <div className="text-right mb-6">
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
                >
                  <Plus className="w-4 h-4 mr-2" /> 멤버 추가
                </button>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member) => (
                <div key={member.id} className="bg-white p-6 rounded-lg shadow-lg text-center relative">
                  <img
                    src={`http://localhost:3001${member.image}`}
                    className="w-32 h-40 mx-auto object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                  <p className="text-sm text-blue-600">{member.research}</p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                  {role === "researcher" && member.github && <p className="text-sm text-gray-500">GitHub: {member.github}</p>}
                  {role === "graduate" && (
                    <>
                      <p className="text-sm text-gray-500">Graduation: {member.graduation}</p>
                      <p className="text-sm text-gray-500">Current: {member.current_position}</p>
                    </>
                  )}
                  {isAuthorized && (
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {isAddModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl max-w-xl w-full p-6 relative">
                  <button onClick={() => setIsAddModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                    <X className="w-6 h-6" />
                  </button>
                  <h3 className="text-2xl font-bold text-blue-700 mb-4">멤버 추가</h3>
                  <div className="space-y-4">
                    {(["name", "email", "research"] as const).map((field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{field}</label>
                        <input
                          type="text"
                          value={newMember[field]}
                          onChange={(e) => setNewMember({ ...newMember, [field]: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                      </div>
                    ))}
                    {role === "researcher" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                        <input
                          type="text"
                          value={newMember.github}
                          onChange={(e) => setNewMember({ ...newMember, github: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                      </div>
                    )}
                    {role === "graduate" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Graduation</label>
                          <input
                            type="text"
                            value={newMember.graduation}
                            onChange={(e) => setNewMember({ ...newMember, graduation: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Current Position</label>
                          <input
                            type="text"
                            value={newMember.current_position}
                            onChange={(e) => setNewMember({ ...newMember, current_position: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg"
                          />
                        </div>
                      </>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">이미지 업로드</label>
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
          </>
        )}
      </div>
    </section>
  )
}
