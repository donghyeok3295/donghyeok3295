"use client"

import { Menu, X } from "lucide-react"
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAdmin } from "@/hooks/useAdmin"

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const { isAuthorized, login, logout } = useAdmin()

  const pathname = usePathname()
  const router = useRouter()

  // 현재 경로를 기반으로 활성 섹션 결정
  const getActiveSection = () => {
    if (pathname === '/') return 'home'
    if (pathname.startsWith('/about')) return 'about'
    if (pathname.startsWith('/board')) return 'board'
    if (pathname.startsWith('/members')) return 'members'
    if (pathname.startsWith('/publications')) return 'publications'
    if (pathname.startsWith('/contact')) return 'contact'
    return 'home'
  }

  const activeSection = getActiveSection()
  
  const menuItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "about", label: "About", path: "/about" },
    { 
      id: "members", 
      label: "Members", 
      path: "/members",
      dropdown: [
        { label: "Professor", path: "/members/professor" },
        { label: "Researchers", path: "/members/researchers" },
        { label: "Alumni", path: "/members/alumni" }
      ]
    },
    { id: "publications", label: "Publications", path: "/publications" },
    { 
      id: "board", 
      label: "Board", 
      path: "/board",
      dropdown: [
        { label: "News", path: "/board/news" },
        { label: "Gallery", path: "/board/gallery" },
      ]
    },
    { id: "contact", label: "Contact", path: "/contact" },
  ]

  const handleMouseEnter = (itemId: string) => {
    setOpenDropdown(itemId)
  }

  const handleMouseLeave = () => {
    setOpenDropdown(null)
  }

  return (
    <nav className="fixed top-0 w-full bg-blue-900 text-white z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <button
              className="text-xl font-bold hover:text-blue-300 transition-colors focus:outline-none"
              onClick={() => router.push("/")}
            >
              IST Lab
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => item.dropdown && handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => router.push(item.path)}
                  className={`px-3 py-2 text-lg font-bold transition-colors focus:outline-none ${
                    activeSection === item.id ? "text-white font-bold" : "text-blue-300 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
                
                {/* Dropdown Menu */}
                {item.dropdown && openDropdown === item.id && (
                  <div className="absolute top-full left-0 mt-0 bg-blue-800 rounded-b-lg shadow-lg z-50 animate-dropdown min-w-40">
                    <div className="py-2">
                      {item.dropdown.map((dropdownItem, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            router.push(dropdownItem.path)
                            setOpenDropdown(null)
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-blue-200 hover:text-white hover:bg-blue-700 transition-colors focus:outline-none"
                        >
                          {dropdownItem.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* University Info + 관리자 버튼 */}
          <div className="hidden md:flex items-center justify-end flex-shrink-0 space-x-6">
  <div className="text-right">
    <div className="text-sm">Kunsan National University</div>
    <div className="text-xs opacity-80">Software Department</div>
  </div>
  <div>
    {!isAuthorized ? (
      <button
        onClick={login}
        className="text-xs text-blue-300 hover:text-white border border-blue-300 px-2 py-1 rounded"
      >
        관리자 로그인
      </button>
    ) : (
      <button
        onClick={logout}
        className="text-xs text-red-300 hover:text-white border border-red-300 px-2 py-1 rounded"
      >
        로그아웃
      </button>
    )}
  </div>
</div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 focus:outline-none">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      router.push(item.path)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`block px-3 py-2 text-lg font-bold transition-colors focus:outline-none ${
                      activeSection === item.id ? "text-white font-bold" : "text-blue-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                  {/* Mobile Dropdown */}
                  {item.dropdown && (
                    <div className="ml-4 space-y-1">
                      {item.dropdown.map((dropdownItem, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            router.push(dropdownItem.path)
                            setIsMobileMenuOpen(false)
                          }}
                          className="block px-3 py-2 text-sm text-blue-200 hover:text-white transition-colors focus:outline-none"
                        >
                          {dropdownItem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

               <div className="mt-4 px-3">
        {!isAuthorized ? (
          <button
            onClick={login}
            className="w-full text-xs text-blue-300 hover:text-white border border-blue-300 px-3 py-2 rounded"
          >
            관리자 로그인
          </button>
        ) : (
          <button
            onClick={logout}
            className="w-full text-xs text-red-300 hover:text-white border border-red-300 px-3 py-2 rounded"
          >
            로그아웃
          </button>
        )}
      </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
