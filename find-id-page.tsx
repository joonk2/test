"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Phone, CheckCircle, ArrowRight, MessageSquare, Lock } from "lucide-react"

interface FindIdPageProps {
  onNavigateToLogin?: () => void
}

export default function FindIdPage({ onNavigateToLogin }: FindIdPageProps) {
  const [activeTab, setActiveTab] = useState<"findId" | "resetPassword">("findId")

  // 아이디 찾기 상태
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  })
  const [foundId, setFoundId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // 비밀번호 재설정 상태
  const [resetFormData, setResetFormData] = useState({
    id: "",
    phone: "",
  })
  const [isResetLoading, setIsResetLoading] = useState(false)
  const [resetResult, setResetResult] = useState<string | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleResetInputChange = (field: string, value: string) => {
    setResetFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // 시뮬레이션: 2초 후 아이디 찾기 결과
    setTimeout(() => {
      setFoundId("kim***")
      setIsLoading(false)
    }, 2000)
  }

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsResetLoading(true)

    // 시뮬레이션: 2초 후 비밀번호 재설정 결과
    setTimeout(() => {
      setResetResult("임시 비밀번호가 휴대폰으로 전송되었습니다.")
      setIsResetLoading(false)
    }, 2000)
  }

  const handleReset = () => {
    setFoundId(null)
    setFormData({ name: "", phone: "" })
  }

  const handleResetReset = () => {
    setResetResult(null)
    setResetFormData({ id: "", phone: "" })
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {activeTab === "findId" ? "아이디 찾기" : "비밀번호 찾기"}
          </h1>
          <p className="text-gray-600">{activeTab === "findId" ? "아이디를 찾으시나요?" : "비밀번호를 찾으시나요?"}</p>
          <p className="text-sm text-gray-500 mt-1">회원가입시 입력한 아래의 정보를 입력해주세요</p>
        </div>

        {/* 탭 메뉴 */}
        <div className="flex mb-8 bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setActiveTab("findId")}
            className={`flex-1 py-3 px-4 text-sm font-medium rounded-full transition-all duration-200 ${
              activeTab === "findId" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-800"
            }`}
          >
            아이디 찾기
          </button>
          <button
            onClick={() => setActiveTab("resetPassword")}
            className={`flex-1 py-3 px-4 text-sm font-medium rounded-full transition-all duration-200 ${
              activeTab === "resetPassword" ? "bg-blue-500 text-white shadow-sm" : "text-gray-600 hover:text-gray-800"
            }`}
          >
            비밀번호 재설정
          </button>
        </div>

        {activeTab === "findId" ? (
          foundId ? (
            /* 아이디 찾기 결과 */
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">아이디를 찾았습니다!</h3>
                <p className="text-gray-600 mb-6">회원님의 아이디는 다음과 같습니다.</p>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <p className="text-2xl font-bold text-gray-900">{foundId}</p>
                </div>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={onNavigateToLogin}
                  className="w-full h-12 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  로그인
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="w-full h-12 border-orange-300 text-orange-600 hover:bg-orange-50 rounded-lg font-medium bg-transparent"
                >
                  다시 찾기
                </Button>
              </div>
            </div>
          ) : (
            /* 아이디 찾기 폼 */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 이름 입력 */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-900">
                  이름 *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="name"
                    placeholder="이름을 입력하세요"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="h-12 pl-10 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* 전화번호 입력 */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-900">
                  전화번호 *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="phone"
                    placeholder="전화번호를 입력하세요"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="h-12 pl-10 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* 버튼 영역 */}
              <div className="space-y-3 pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium disabled:opacity-50"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  {isLoading ? "찾는 중..." : "확인"}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">또는</span>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={onNavigateToLogin}
                  className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium"
                >
                  취소
                </Button>
              </div>
            </form>
          )
        ) : /* 비밀번호 재설정 */
        resetResult ? (
          /* 비밀번호 재설정 결과 */
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">임시 비밀번호 전송 완료!</h3>
              <p className="text-gray-600 mb-4">{resetResult}</p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-blue-900 mb-1">안내사항</p>
                    <p className="text-xs text-blue-700 leading-relaxed">
                      • 임시 비밀번호로 로그인 후 반드시 새 비밀번호로 변경해주세요
                      <br />• 임시 비밀번호는 24시간 후 만료됩니다
                      <br />• 문자가 오지 않으면 스팸함을 확인해주세요
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <Button
                onClick={onNavigateToLogin}
                className="w-full h-12 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                로그인하기
              </Button>
              <Button
                onClick={handleResetReset}
                variant="outline"
                className="w-full h-12 border-orange-300 text-orange-600 hover:bg-orange-50 rounded-lg font-medium bg-transparent"
              >
                다시 시도
              </Button>
            </div>
          </div>
        ) : (
          /* 비밀번호 재설정 폼 */
          <div className="space-y-6">
            <form onSubmit={handleResetSubmit} className="space-y-6">
              {/* 아이디 입력 */}
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="resetId"
                    placeholder="아이디를 입력하세요"
                    value={resetFormData.id}
                    onChange={(e) => handleResetInputChange("id", e.target.value)}
                    className="h-12 pl-10 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* 전화번호 입력 */}
              <div className="space-y-2">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="resetPhone"
                    placeholder="전화번호를 입력하세요"
                    value={resetFormData.phone}
                    onChange={(e) => handleResetInputChange("phone", e.target.value)}
                    className="h-12 pl-10 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 ml-1">* 없이 입력해주세요</p>
              </div>

              {/* 버튼 영역 */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isResetLoading}
                  className="flex-1 h-12 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium disabled:opacity-50"
                >
                  {isResetLoading ? "확인 중..." : "확인"}
                </Button>
                <Button
                  type="button"
                  onClick={onNavigateToLogin}
                  className="flex-1 h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium"
                >
                  취소
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* 하단 링크 */}
        <div className="text-center mt-8">
          <Button variant="ghost" onClick={onNavigateToLogin} className="text-gray-500 hover:text-gray-700 text-sm">
            로그인 페이지로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  )
}
