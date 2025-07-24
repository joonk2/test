"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Lock, Eye, EyeOff, ArrowRight, UserPlus } from "lucide-react"

interface LoginPageProps {
  onNavigateToFindId?: () => void
  onNavigateToSignup?: () => void
}

export default function LoginPage({ onNavigateToFindId, onNavigateToSignup }: LoginPageProps) {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("로그인:", formData)
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 아이디 입력 */}
          <div className="space-y-2">
            <Label htmlFor="id" className="text-sm font-medium text-gray-900">
              아이디 *
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="id"
                placeholder="아이디를 입력하세요"
                value={formData.id}
                onChange={(e) => handleInputChange("id", e.target.value)}
                className="h-12 pl-10 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* 비밀번호 입력 */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-900">
              비밀번호 *
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력하세요"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="h-12 pl-10 pr-10 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* 로그인 유지 및 찾기 링크 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
              />
              <Label htmlFor="rememberMe" className="text-sm text-gray-700 cursor-pointer">
                로그인 상태 유지
              </Label>
            </div>

            <Button
              type="button"
              variant="ghost"
              onClick={onNavigateToFindId}
              className="text-orange-600 hover:text-orange-700 text-sm p-0 h-auto font-normal"
            >
              아이디/비밀번호 찾기
            </Button>
          </div>

          {/* 로그인 버튼 */}
          <Button
            type="submit"
            className="w-full h-12 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            로그인
          </Button>

          {/* 구분선 */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">또는</span>
            </div>
          </div>

          {/* 회원가입 버튼 */}
          <Button
            type="button"
            onClick={onNavigateToSignup}
            variant="outline"
            className="w-full h-12 border-orange-300 text-orange-600 hover:bg-orange-50 rounded-lg font-medium bg-transparent"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            회원가입
          </Button>
        </form>
      </div>
    </div>
  )
}
