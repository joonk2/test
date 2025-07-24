"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Brain, Camera, Music, BookOpen, Users, Settings, LogOut, Play, Star, Clock, Award } from "lucide-react"
import {
  MemoryTrainingSession,
  PhotoReminiscenceSession,
  MusicTherapySession,
  StoryTellingSession,
} from "./training-sessions"

export default function MainPage() {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null)
  const [currentProgram, setCurrentProgram] = useState<string | null>(null)

  const programs = [
    {
      id: "memory-training",
      title: "기억 되살리기",
      subtitle: "소중한 추억을 함께 나눠보세요",
      description: "과거의 아름다운 순간들을 되돌아보며 기억력을 향상시키는 프로그램입니다.",
      icon: Brain,
      image: "/placeholder.svg?height=200&width=300",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      sessions: 12,
      duration: "30분",
      level: "초급",
    },
    {
      id: "photo-reminiscence",
      title: "사진으로 떠나는 여행",
      subtitle: "옛 사진 속 이야기를 들려주세요",
      description: "가족사진, 여행사진을 보며 그때의 감정과 기억을 되살려보는 시간입니다.",
      icon: Camera,
      image: "/placeholder.svg?height=200&width=300",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      sessions: 8,
      duration: "25분",
      level: "초급",
    },
    {
      id: "music-therapy",
      title: "추억의 멜로디",
      subtitle: "음악과 함께하는 기억 여행",
      description: "옛날 노래를 들으며 그 시절의 추억과 감정을 되살려보는 음악 치료입니다.",
      icon: Music,
      image: "/placeholder.svg?height=200&width=300",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      sessions: 10,
      duration: "35분",
      level: "중급",
    },
    {
      id: "story-telling",
      title: "이야기 나누기",
      subtitle: "인생의 소중한 이야기들",
      description: "살아온 이야기를 나누며 자존감을 높이고 소통 능력을 향상시킵니다.",
      icon: BookOpen,
      image: "/placeholder.svg?height=200&width=300",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      sessions: 15,
      duration: "40분",
      level: "중급",
    },
  ]

  // 프로그램이 선택되면 해당 훈련 창 표시
  if (currentProgram) {
    return (
      <div>
        {currentProgram === "memory-training" && <MemoryTrainingSession onBack={() => setCurrentProgram(null)} />}
        {currentProgram === "photo-reminiscence" && <PhotoReminiscenceSession onBack={() => setCurrentProgram(null)} />}
        {currentProgram === "music-therapy" && <MusicTherapySession onBack={() => setCurrentProgram(null)} />}
        {currentProgram === "story-telling" && <StoryTellingSession onBack={() => setCurrentProgram(null)} />}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* 헤더 */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* 로고 */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  기억의 정원
                </h1>
                <p className="text-sm text-gray-500">Memory Garden</p>
              </div>
            </div>

            {/* 네비게이션 */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                마이페이지
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                모임
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                기록하기
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                되돌아보기
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                도우미
              </a>
            </nav>

            {/* 사용자 메뉴 */}
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">김씨피 님</span>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* 히어로 섹션 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            오늘도 소중한 기억을 만들어가요
          </div>
          <h2 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
            어떤{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              추억 여행
            </span>
            을<br />
            떠나고 싶으신가요?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            각자의 속도에 맞춰 진행되는 개인 맞춤형 회상 훈련 프로그램으로
            <br />
            소중한 기억들을 되살리고 새로운 추억을 만들어보세요
          </p>
        </div>

        {/* 프로그램 카드들 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {programs.map((program) => {
            const IconComponent = program.icon
            return (
              <Card
                key={program.id}
                className={`group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border-0 overflow-hidden ${
                  selectedProgram === program.id ? "ring-4 ring-blue-500 shadow-2xl scale-[1.02]" : ""
                }`}
                onClick={() => setSelectedProgram(program.id)}
              >
                <CardContent className="p-0">
                  {/* 카드 헤더 */}
                  <div className={`bg-gradient-to-r ${program.color} p-6 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <IconComponent className="w-8 h-8" />
                        <div className="flex gap-2">
                          <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-medium">
                            {program.level}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{program.title}</h3>
                      <p className="text-white/90 text-lg">{program.subtitle}</p>
                    </div>
                  </div>

                  {/* 카드 이미지 */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={program.image || "/placeholder.svg"}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  {/* 카드 내용 */}
                  <div className="p-6">
                    <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>

                    {/* 프로그램 정보 */}
                    <div className="flex items-center gap-6 mb-6 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{program.sessions}회차</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        <span>{program.level}</span>
                      </div>
                    </div>

                    {/* 시작하기 버튼 */}
                    <Button
                      className={`w-full h-12 text-base font-medium bg-gradient-to-r ${program.color} hover:shadow-lg transition-all duration-200 group-hover:scale-105`}
                      onClick={() => setCurrentProgram(program.id)}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      시작하기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* 하단 액션 버튼 */}
        <div className="text-center">
          <Button
            size="lg"
            className="h-16 px-12 text-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            disabled={!selectedProgram}
            onClick={() => selectedProgram && setCurrentProgram(selectedProgram)}
          >
            <Heart className="w-6 h-6 mr-3" />
            선택한 프로그램 시작하기
          </Button>
          {!selectedProgram && <p className="text-gray-500 mt-4">위에서 원하시는 프로그램을 선택해주세요</p>}
        </div>

        {/* 추가 정보 섹션 */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold mb-2">함께하는 즐거움</h4>
            <p className="text-gray-600">가족, 친구들과 함께 참여할 수 있는 프로그램입니다</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-lg font-semibold mb-2">과학적 접근</h4>
            <p className="text-gray-600">전문가가 설계한 체계적인 인지 훈련 프로그램</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="text-lg font-semibold mb-2">개인 맞춤형</h4>
            <p className="text-gray-600">각자의 속도와 수준에 맞춘 개별화된 훈련</p>
          </div>
        </div>
      </main>
    </div>
  )
}
