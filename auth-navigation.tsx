"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import LoginPage from "./login-page"
import FindIdPage from "./find-id-page"
import SignupPage from "./signup-page"

type PageType = "login" | "findId" | "signup"

interface AuthNavigationProps {
  onBackToMain?: () => void
}

export default function AuthNavigation({ onBackToMain }: AuthNavigationProps) {
  const [currentPage, setCurrentPage] = useState<PageType>("login")

  const navigateToLogin = () => setCurrentPage("login")
  const navigateToFindId = () => setCurrentPage("findId")
  const navigateToSignup = () => setCurrentPage("signup")

  return (
    <div className="relative">
      {/* 메인으로 돌아가기 버튼 */}
      {onBackToMain && (
        <div className="absolute top-4 left-4 z-50">
          <Button
            variant="ghost"
            onClick={onBackToMain}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            메인으로
          </Button>
        </div>
      )}

      {/* 인증 페이지들 */}
      {currentPage === "login" && (
        <LoginPage onNavigateToFindId={navigateToFindId} onNavigateToSignup={navigateToSignup} />
      )}
      {currentPage === "findId" && <FindIdPage onNavigateToLogin={navigateToLogin} />}
      {currentPage === "signup" && <SignupPage />}
    </div>
  )
}
