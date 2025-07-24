"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, ChevronLeft, ChevronRight, Heart, Brain, Camera, Music, BookOpen, Play, Clock, Smile, Meh, Frown, X, Star, TrendingUp, Award } from 'lucide-react'

interface TrainingRecord {
  id: string
  date: string
  type: "memory" | "photo" | "music" | "story"
  duration: number
  emotionScore: number
  emotionType: "happy" | "neutral" | "sad"
  sessions: {
    name: string
    duration: number
    question: string
    response: string
    videoUrl?: string
  }[]
  overallMood: string
  insights: string[]
}

const mockRecords: TrainingRecord[] = [
  {
    id: "1",
    date: "2024-01-16",
    type: "memory",
    duration: 30,
    emotionScore: 85,
    emotionType: "happy",
    overallMood: "기쁨",
    insights: ["과거 추억에 대한 긍정적 반응", "가족에 대한 따뜻한 감정 표현", "기억력 향상 징후"],
    sessions: [
      {
        name: "기초질문",
        duration: 10,
        question: "식사는 어떤 걸로 드셨나요?",
        response: "오늘은 미역국과 밥을 먹었어요. 아내가 해준 음식이 그리워요.",
      },
      {
        name: "개인화질문",
        duration: 10,
        question: "아들 자랑 좀 해주세요.",
        response: "우리 아들이 의사가 되어서 정말 자랑스러워요.",
      },
      {
        name: "인지자극질문",
        duration: 10,
        question: "이 소리를 들으니 생각나는 추억이 있나요?",
        response: "바닷가에서 가족들과 함께 놀던 기억이 나네요.",
      },
    ],
  },
  {
    id: "2",
    date: "2024-01-15",
    type: "photo",
    duration: 25,
    emotionScore: 70,
    emotionType: "neutral",
    overallMood: "평온",
    insights: ["사진을 통한 기억 회상 활발", "감정 표현 안정적", "집중력 양호"],
    sessions: [
      {
        name: "가족사진 회상",
        duration: 12,
        question: "이 사진 속 인물들을 기억하시나요?",
        response: "우리 가족이에요. 아이들이 어렸을 때 찍은 사진이네요.",
      },
      {
        name: "여행사진 회상",
        duration: 13,
        question: "이곳은 어디인가요?",
        response: "제주도에 갔을 때 찍은 사진이에요. 정말 아름다웠어요.",
      },
    ],
  },
  {
    id: "3",
    date: "2024-01-14",
    type: "music",
    duration: 35,
    emotionScore: 90,
    emotionType: "happy",
    overallMood: "행복",
    insights: ["음악에 대한 강한 정서적 반응", "과거 기억과의 연결 우수", "감정 표현 풍부"],
    sessions: [
      {
        name: "고향의 봄",
        duration: 15,
        question: "이 노래를 들으면 어떤 기분이 드시나요?",
        response: "어린 시절 고향이 그리워져요. 엄마가 불러주던 노래예요.",
      },
      {
        name: "아리랑",
        duration: 20,
        question: "이 노래와 관련된 추억이 있으신가요?",
        response: "젊었을 때 친구들과 함께 부르던 노래예요. 그때가 그립네요.",
      },
    ],
  },
]

export default function MemoryCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 16)) // January 16, 2024
  const [selectedRecord, setSelectedRecord] = useState<TrainingRecord | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // 이전 달의 빈 칸들
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // 현재 달의 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    return days
  }

  const getRecordForDate = (day: number) => {
    const dateStr = `2024-01-${day.toString().padStart(2, "0")}`
    return mockRecords.find((record) => record.date === dateStr)
  }

  const getEmotionIcon = (emotionType: string) => {
    switch (emotionType) {
      case "happy":
        return <Smile className="w-4 h-4 text-green-500" />
      case "neutral":
        return <Meh className="w-4 h-4 text-yellow-500" />
      case "sad":
        return <Frown className="w-4 h-4 text-red-500" />
      default:
        return <Meh className="w-4 h-4 text-gray-400" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "memory":
        return <Brain className="w-4 h-4 text-blue-500" />
      case "photo":
        return <Camera className="w-4 h-4 text-purple-500" />
      case "music":
        return <Music className="w-4 h-4 text-green-500" />
      case "story":
        return <BookOpen className="w-4 h-4 text-orange-500" />
      default:
        return <Heart className="w-4 h-4 text-gray-400" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "memory":
        return "from-blue-400 to-blue-600"
      case "photo":
        return "from-purple-400 to-purple-600"
      case "music":
        return "from-green-400 to-green-600"
      case "story":
        return "from-orange-400 to-orange-600"
      default:
        return "from-gray-400 to-gray-600"
    }
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const days = getDaysInMonth(currentDate)
  const monthNames = [
    "1월", "2월", "3월", "4월", "5월", "6월",
    "7월", "8월", "9월", "10월", "11월", "12월"
  ]
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            기억의 정원 캘린더
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            매일의 소중한 감정과 추억을 되새기며 성장하는 여정을 기록해보세요
          </p>
        </div>

        {/* 캘린더 카드 */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-lg rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => navigateMonth("prev")}
                className="text-white hover:bg-white/20 rounded-full"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              
              <CardTitle className="text-3xl font-bold">
                {currentDate.getFullYear()}년 {monthNames[currentDate.getMonth()]}
              </CardTitle>
              
              <Button
                variant="ghost"
                size="lg"
                onClick={() => navigateMonth("next")}
                className="text-white hover:bg-white/20 rounded-full"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            {/* 요일 헤더 */}
            <div className="grid grid-cols-7 gap-4 mb-6">
              {dayNames.map((day) => (
                <div key={day} className="text-center font-semibold text-gray-600 py-3">
                  {day}
                </div>
              ))}
            </div>

            {/* 캘린더 그리드 */}
            <div className="grid grid-cols-7 gap-4">
              {days.map((day, index) => {
                if (!day) {
                  return <div key={index} className="aspect-square" />
                }

                const record = getRecordForDate(day)
                const isToday = day === 16 // 예시로 16일을 오늘로 설정

                return (
                  <div
                    key={day}
                    className={`aspect-square relative rounded-2xl border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${
                      isToday
                        ? "border-blue-500 bg-blue-50 shadow-lg"
                        : record
                          ? "border-gray-200 bg-white shadow-md hover:shadow-lg"
                          : "border-gray-100 bg-gray-50 hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      if (record) {
                        setSelectedRecord(record)
                        setIsDetailOpen(true)
                      }
                    }}
                  >
                    {/* 날짜 */}
                    <div className="absolute top-2 left-2">
                      <span className={`text-sm font-semibold ${isToday ? "text-blue-600" : "text-gray-700"}`}>
                        {day}
                      </span>
                    </div>

                    {/* 기록이 있는 경우 */}
                    {record && (
                      <div className="absolute inset-2 top-8 flex flex-col items-center justify-center gap-1">
                        {/* 훈련 타입 아이콘 */}
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${getTypeColor(record.type)} flex items-center justify-center shadow-sm`}>
                          {getTypeIcon(record.type)}
                        </div>

                        {/* 감정 상태 */}
                        <div className="flex items-center gap-1">
                          {getEmotionIcon(record.emotionType)}
                          <span className="text-xs font-medium text-gray-600">{record.emotionScore}</span>
                        </div>

                        {/* 소요 시간 */}
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{record.duration}분</span>
                        </div>
                      </div>
                    )}

                    {/* 오늘 표시 */}
                    {isToday && (
                      <div className="absolute bottom-1 right-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* 통계 카드들 */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">이번 달 훈련</p>
                  <p className="text-3xl font-bold">12회</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">평균 감정 점수</p>
                  <p className="text-3xl font-bold">82점</p>
                </div>
                <Star className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-400 to-pink-500 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">연속 훈련</p>
                  <p className="text-3xl font-bold">7일</p>
                </div>
                <Award className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 상세 기록 모달 */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-6">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold text-gray-800">
                {selectedRecord?.date.split('-')[1]}월 {selectedRecord?.date.split('-')[2]}일 회상기록
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDetailOpen(false)}
                className="rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </DialogHeader>

          {selectedRecord && (
            <div className="space-y-6">
              {/* 감정 상태 요약 */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">오늘의 감정 상태</h3>
                    <Badge variant="secondary" className="bg-white/80 text-gray-700">
                      {selectedRecord.overallMood} 😊
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">감정 점수</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${selectedRecord.emotionScore}%` }}
                          />
                        </div>
                        <span className="text-lg font-bold text-gray-800">{selectedRecord.emotionScore}점</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600 mb-2">총 훈련 시간</p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <span className="text-lg font-semibold text-gray-800">{selectedRecord.duration}분</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI 인사이트 */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-blue-500" />
                    AI 분석 인사이트
                  </h3>
                  <div className="space-y-2">
                    {selectedRecord.insights.map((insight, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-gray-700">{insight}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 세션 기록들 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">세션 기록</h3>
                {selectedRecord.sessions.map((session, index) => (
                  <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getTypeColor(selectedRecord.type)} flex items-center justify-center`}>
                            {getTypeIcon(selectedRecord.type)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{session.name}</h4>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {session.duration}분
                            </p>
                          </div>
                        </div>
                        
                        {session.videoUrl && (
                          <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                            <Play className="w-4 h-4 mr-2" />
                            영상 보기
                          </Button>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm font-medium text-gray-600 mb-2">질문</p>
                          <p className="text-gray-800">{session.question}</p>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-sm font-medium text-blue-600 mb-2">답변</p>
                          <p className="text-gray-800">{session.response}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
