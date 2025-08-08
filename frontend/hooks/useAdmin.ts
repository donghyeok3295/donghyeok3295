// hooks/useAdmin.ts
import { useEffect, useState } from "react"

export function useAdmin() {
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const storedKey = localStorage.getItem("adminKey")
    const envKey = process.env.NEXT_PUBLIC_ADMIN_KEY
    if (storedKey && storedKey === envKey) {
      setIsAuthorized(true)
    }
  }, [])

  const login = () => {
    const input = prompt("관리자 키를 입력하세요")
    const envKey = process.env.NEXT_PUBLIC_ADMIN_KEY
    if (input === envKey) {
      localStorage.setItem("adminKey", input)
      setIsAuthorized(true)
      alert("✅ 관리자 인증 성공!")
    } else {
      alert("❌ 잘못된 키입니다.")
    }
  }

  const logout = () => {
    localStorage.removeItem("adminKey")
    setIsAuthorized(false)
  }

  return { isAuthorized, login, logout }
}
