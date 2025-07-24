"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Heart,
  Brain,
  Camera,
  BookOpen,
  Users,
  Settings,
  LogOut,
  Play,
  Star,
  Clock,
  Award,
  User,
  UserPlus,
  Volume2,
} from "lucide-react"
import {
  MemoryTrainingSession,
  PhotoReminiscenceSession,
  MusicTherapySession,
  StoryTellingSession,
} from "./training-sessions"

interface MainPageProps {
  onNavigateToAuth?: () => void
}

export default function MainPage({ onNavigateToAuth }: MainPageProps) {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null)
  const [currentProgram, setCurrentProgram] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // 로그인 상태로 설정

  const programs = [
    {
      id: "memory-training",
      title: "기억 꺼내기",
      subtitle: "기초 질문으로 시작해보세요",
      description: "일상적인 기본 질문들을 통해 자연스럽게 기억을 되살려보는 프로그램입니다.",
      icon: Brain,
      image: "/placeholder.svg?height=200&width=300",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      duration: "10분",
      level: "기초질문",
      category: "기초질문",
    },
    {
      id: "story-telling",
      title: "이야기 나누기",
      subtitle: "개인의 특별한 인생 이야기들",
      description: "개인의 경험과 관심사를 바탕으로 한 맞춤형 대화를 통해 소통 능력을 향상시킵니다.",
      icon: BookOpen,
      image: "/placeholder.svg?height=200&width=300",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      duration: "10분",
      level: "개인화질문",
      category: "개인화질문",
    },
    {
      id: "music-therapy",
      title: "들려오는 추억",
      subtitle: "음악과 일상소리로 기억을 자극해보세요",
      description: "음악과 다양한 일상소리를 통해 인지 능력을 자극하고 감정을 되살리는 프로그램입니다.",
      icon: Volume2,
      image: "/placeholder.svg?height=200&width=300",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      duration: "10분",
      level: "인지자극질문",
      category: "인지자극질문",
    },
    {
      id: "photo-reminiscence",
      title: "추억의 시대",
      subtitle: "그 시절 사회 모습으로 떠나는 시간여행",
      description:
        "1960-1980년대 한국의 사회적 이슈와 시대상을 담은 사진들로 그 시절 추억을 되살려보는 프로그램입니다.",
      icon: Camera,
      image: "/placeholder.svg?height=200&width=300&text=1970s+Korea",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      duration: "10분",
      level: "인지자극질문",
      category: "인지자극질문",
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

  const handleProgramStart = (programId: string) => {
    if (!isLoggedIn) {
      onNavigateToAuth?.()
      return
    }

    setCurrentProgram(programId)
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
                프로그램
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
              {isLoggedIn ? (
                <>
                  <span className="text-gray-700 font-medium">김씨피 님</span>
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-gray-800"
                    onClick={() => setIsLoggedIn(false)}
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={onNavigateToAuth}
                    className="text-gray-700 hover:text-blue-600 font-medium"
                  >
                    <User className="w-4 h-4 mr-2" />
                    로그인
                  </Button>
                  <Button
                    onClick={onNavigateToAuth}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium px-4 py-2 rounded-lg"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    회원가입
                  </Button>
                </>
              )}
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

        {/* 추천 순서 안내 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6 mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">추천 프로그램 순서</h3>
          </div>
          <p className="text-gray-600 mb-4">
            <strong>기초질문</strong> → <strong>개인화질문</strong> → <strong>인지자극질문</strong> 순서로 진행하시면
            더욱 효과적입니다
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">1단계</span>
            <span>→</span>
            <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full">2단계</span>
            <span>→</span>
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">3단계</span>
            <span>→</span>
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">4단계</span>
          </div>
        </div>

        {/* 프로그램 카드들 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {programs.map((program, index) => {
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
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <IconComponent className="w-8 h-8" />
                        </div>
                        <div className="flex gap-2">
                          <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-medium">
                            {program.category}
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
                      onClick={() => handleProgramStart(program.id)}
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
            onClick={() => selectedProgram && handleProgramStart(selectedProgram)}
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
            <h4 className="text-lg font-semibold mb-2">시대적 공감</h4>
            <p className="text-gray-600">그 시절 추억과 경험을 바탕으로 한 특별한 회상</p>
          </div>
        </div>
      </main>
    </div>
  )
}
