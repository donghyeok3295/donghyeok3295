"use client"

import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { useEffect, useRef, useState } from "react"

declare global {
  interface Window {
    naver: any
  }
}

export default function ContactSection() {
  const mapRef = useRef<HTMLDivElement>(null)

  // 🔧 POST 전송용 폼 상태
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { name, email, subject, message } = form
    if (!name || !email || !subject || !message) {
      alert("모든 필수 항목을 입력해주세요.")
      return
    }

  try {
  const url = `${process.env.NEXT_PUBLIC_API_BASE}/contact`
  console.log("📡 POST 요청 보낼 주소:", url)
  console.log("📨 보낼 데이터:", form)

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  })


      if (res.ok) {
        alert("문의가 성공적으로 전송되었습니다.")
        setForm({ name: "", email: "", subject: "", message: "" })
      } else {
        alert("전송 실패! 다시 시도해주세요.")
      }
    } catch (err) {
      console.error("전송 실패:", err)
      alert("오류가 발생했습니다.")
    }
  }

  // ✅ 네이버 지도 그대로 유지
  useEffect(() => {
    const initMap = () => {
      if (window.naver && window.naver.maps && mapRef.current) {
        const location = new window.naver.maps.LatLng(35.9676, 126.7370)

        const map = new window.naver.maps.Map(mapRef.current, {
          center: location,
          zoom: 16,
          mapTypeControl: true,
        })

        new window.naver.maps.Marker({
          position: location,
          map,
          title: "IST Lab - 군산대학교",
        })
      }
    }

    const script = document.createElement("script")
    script.src = "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=p9o45cn0uh"
    script.async = true
    script.onload = initMap
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Contact</h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto mb-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* 좌측: 지도 + 정보 (유지) */}
          <div>
            <div className="bg-white rounded-lg shadow-xl p-8 h-full">
              <h3 className="text-2xl font-bold text-blue-700 mb-6">연락처 정보</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">주소</h4>
                    <p className="text-gray-600">
                      전북특별자치도 군산시 대학로 558(미룡동)
                      <br />
                      디지털정보관 1층 151-107 IST 연구실
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">전화번호</h4>
                    <p className="text-gray-600">063-469-8912</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">이메일</h4>
                    <p className="text-gray-600">istlab@kunsan.ac.kr</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">운영시간</h4>
                    <p className="text-gray-600">평일 09:00 - 21:00</p>
                  </div>
                </div>
              </div>

              {/* ✅ 지도 유지 */}
              <div className="mt-8">
                <div
                  ref={mapRef}
                  id="naver-map"
                  className="w-full h-96 bg-gray-200 rounded-lg"
                  style={{ minHeight: "384px" }}
                />
              </div>
            </div>
          </div>

          {/* 우측: 폼만 수정됨 */}
          <div>
            <div className="bg-white rounded-lg shadow-xl p-8 h-full">
              <h3 className="text-2xl font-bold text-blue-700 mb-6">문의하기</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* 이름 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">이름 *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="이름을 입력하세요"
                  />
                </div>
                {/* 이메일 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">이메일 *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="이메일을 입력하세요"
                  />
                </div>
                {/* 제목 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">제목 *</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="제목을 입력하세요"
                  />
                </div>
                {/* 내용 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">내용 *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-vertical"
                    placeholder="문의 내용을 입력하세요"
                  />
                </div>
                {/* 버튼 */}
                <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium"
                >
                  메시지 보내기
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
