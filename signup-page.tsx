"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, User, Phone, Lock, MapPin, Upload, Check, Heart, Shield, Star } from "lucide-react"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    phone: "",
    id: "",
    password: "",
    confirmPassword: "",
    gender: "",
    address: "",
    profileImage: null as File | null,
  })

  const [agreements, setAgreements] = useState({
    privacy: false,
    marketing: false,
  })

  const [verifications, setVerifications] = useState({
    phone: false,
    id: false,
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }))
    }
  }

  const handleVerification = (type: "phone" | "id") => {
    setVerifications((prev) => ({ ...prev, [type]: true }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("회원가입 데이터:", formData, agreements)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 relative overflow-hidden">
      {/* 배경 장식 요소들 */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200/30 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-indigo-200/30 rounded-full blur-xl"></div>

      <div className="max-w-4xl mx-auto relative">
        {/* 헤더 섹션 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            기억의 여행을 시작해보세요
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            소중한 추억을 되살리고 새로운 기억을 만들어가는 특별한 공간에 오신 것을 환영합니다
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-lg rounded-3xl overflow-hidden">
          <CardContent className="p-0">
            <form onSubmit={handleSubmit}>
              {/* 프로필 섹션 */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white text-center">
                <div className="relative inline-block">
                  <div className="w-32 h-32 mx-auto bg-white/20 backdrop-blur rounded-full flex items-center justify-center border-4 border-white/30 relative overflow-hidden">
                    {formData.profileImage ? (
                      <img
                        src={URL.createObjectURL(formData.profileImage) || "/placeholder.svg"}
                        alt="프로필"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-white/80" />
                    )}
                  </div>
                  <Label htmlFor="profile-upload" className="absolute -bottom-2 -right-2 cursor-pointer">
                    <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                      <Upload className="w-5 h-5" />
                    </div>
                  </Label>
                  <Input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>
                <p className="mt-4 text-white/90 text-lg">프로필 사진을 추가해보세요</p>
              </div>

              <div className="p-8 space-y-8">
                {/* 기본 정보 섹션 */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">기본 정보</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-base font-medium text-gray-700">
                        이름 *
                      </Label>
                      <div className="relative">
                        <Input
                          id="name"
                          placeholder="홍길동"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="h-14 text-base pl-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
                          required
                        />
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="birthDate" className="text-base font-medium text-gray-700">
                        생년월일 *
                      </Label>
                      <div className="relative">
                        <Input
                          id="birthDate"
                          type="date"
                          value={formData.birthDate}
                          onChange={(e) => handleInputChange("birthDate", e.target.value)}
                          className="h-14 text-base pl-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
                          required
                        />
                        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 연락처 및 계정 정보 */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">계정 정보</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-base font-medium text-gray-700">
                        휴대전화 번호 *
                      </Label>
                      <div className="flex gap-3">
                        <div className="relative flex-1">
                          <Input
                            id="phone"
                            placeholder="010-1234-5678"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="h-14 text-base pl-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
                            required
                          />
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                        <Button
                          type="button"
                          onClick={() => handleVerification("phone")}
                          className={`h-14 px-6 rounded-xl font-medium transition-all duration-200 ${
                            verifications.phone
                              ? "bg-green-500 hover:bg-green-600 text-white"
                              : "bg-blue-500 hover:bg-blue-600 text-white"
                          }`}
                          disabled={verifications.phone}
                        >
                          {verifications.phone ? <Check className="w-5 h-5" /> : "인증"}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="userId" className="text-base font-medium text-gray-700">
                        아이디 *
                      </Label>
                      <div className="flex gap-3">
                        <Input
                          id="userId"
                          placeholder="영문, 숫자 6자 이상"
                          value={formData.id}
                          onChange={(e) => handleInputChange("id", e.target.value)}
                          className="h-14 text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors flex-1"
                          required
                        />
                        <Button
                          type="button"
                          onClick={() => handleVerification("id")}
                          className={`h-14 px-6 rounded-xl font-medium transition-all duration-200 ${
                            verifications.id
                              ? "bg-green-500 hover:bg-green-600 text-white"
                              : "bg-blue-500 hover:bg-blue-600 text-white"
                          }`}
                          disabled={verifications.id}
                        >
                          {verifications.id ? <Check className="w-5 h-5" /> : "확인"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="password" className="text-base font-medium text-gray-700">
                        비밀번호 *
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type="password"
                          placeholder="영문, 숫자, 특수문자 포함"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          className="h-14 text-base pl-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
                          required
                        />
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="confirmPassword" className="text-base font-medium text-gray-700">
                        비밀번호 확인 *
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="비밀번호를 다시 입력"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          className="h-14 text-base pl-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
                          required
                        />
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 추가 정보 */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">추가 정보</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-base font-medium text-gray-700">성별 *</Label>
                      <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                        <SelectTrigger className="h-14 text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0">
                          <SelectValue placeholder="성별을 선택해주세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">남성</SelectItem>
                          <SelectItem value="female">여성</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="address" className="text-base font-medium text-gray-700">
                        주소 *
                      </Label>
                      <div className="flex gap-3">
                        <div className="relative flex-1">
                          <Input
                            id="address"
                            placeholder="주소를 입력해주세요"
                            value={formData.address}
                            onChange={(e) => handleInputChange("address", e.target.value)}
                            className="h-14 text-base pl-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
                            required
                          />
                          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                        <Button
                          type="button"
                          className="h-14 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium"
                        >
                          검색
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 약관 동의 */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">서비스 이용 약관</h4>

                  <div className="flex items-start space-x-4">
                    <Checkbox
                      id="privacy"
                      checked={agreements.privacy}
                      onCheckedChange={(checked) => setAgreements((prev) => ({ ...prev, privacy: checked as boolean }))}
                      className="mt-1"
                    />
                    <Label htmlFor="privacy" className="text-base leading-relaxed cursor-pointer">
                      <span className="font-medium">개인정보 수집 및 이용에 동의합니다.</span>
                      <span className="text-blue-600 underline ml-2 hover:text-blue-800">자세히 보기</span>
                    </Label>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Checkbox
                      id="marketing"
                      checked={agreements.marketing}
                      onCheckedChange={(checked) =>
                        setAgreements((prev) => ({ ...prev, marketing: checked as boolean }))
                      }
                      className="mt-1"
                    />
                    <Label htmlFor="marketing" className="text-base leading-relaxed cursor-pointer">
                      <span className="font-medium">마케팅 정보 수신에 동의합니다.</span>
                      <span className="text-sm text-gray-600 block mt-1">
                        새로운 프로그램과 이벤트 소식을 받아보세요 (선택)
                      </span>
                    </Label>
                  </div>
                </div>

                {/* 버튼 */}
                <div className="flex gap-4 pt-8">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-16 text-lg font-medium border-2 border-gray-300 hover:bg-gray-50 rounded-xl transition-all duration-200 bg-transparent"
                  >
                    취소
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-16 text-lg font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                    disabled={!agreements.privacy}
                  >
                    회원가입 완료
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
