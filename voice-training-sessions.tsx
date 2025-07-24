"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  ArrowRight,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  CheckCircle,
  Maximize,
  Brain,
  Camera,
  Music,
} from "lucide-react"

interface VoiceSessionProps {
  onBack: () => void
}

// 음성 녹음 훅
function useVoiceRecording() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      // 오디오 레벨 감지
      const audioContext = new AudioContext()
      const analyser = audioContext.createAnalyser()
      const microphone = audioContext.createMediaStreamSource(stream)
      microphone.connect(analyser)
      audioContextRef.current = audioContext

      const dataArray = new Uint8Array(analyser.frequencyBinCount)
      const updateAudioLevel = () => {
        if (isRecording) {
          analyser.getByteFrequencyData(dataArray)
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length
          setAudioLevel(average)
          requestAnimationFrame(updateAudioLevel)
        }
      }

      mediaRecorder.start()
      setIsRecording(true)
      updateAudioLevel()

      mediaRecorder.ondataavailable = (event) => {
        const audioBlob = new Blob([event.data], { type: "audio/wav" })
        const audioUrl = URL.createObjectURL(audioBlob)
        setRecordedAudio(audioUrl)
      }
    } catch (error) {
      console.error("음성 녹음 오류:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setAudioLevel(0)

      // 스트림 정리
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())

      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }

  return {
    isRecording,
    audioLevel,
    recordedAudio,
    startRecording,
    stopRecording,
  }
}

// 기억 되살리기 음성 훈련
export function VoiceMemoryTrainingSession({ onBack }: VoiceSessionProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAITalking, setIsAITalking] = useState(true)
  const [volume, setVolume] = useState(80)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const { isRecording, audioLevel, recordedAudio, startRecording, stopRecording } = useVoiceRecording()

  const questions = [
    {
      title: "어린 시절의 집",
      question:
        "어린 시절 살았던 집은 어떤 모습이었나요? 집의 색깔이나 마당, 가장 좋아했던 방에 대해 자유롭게 말씀해 주세요.",
      followUp: "정말 좋은 기억이네요. 그 집에서 가장 행복했던 순간은 언제였나요?",
    },
    {
      title: "첫 직장의 기억",
      question: "첫 직장에서의 기억을 들려주세요. 첫 출근날의 기분이나 동료들과의 추억을 말씀해 주세요.",
      followUp: "흥미로운 이야기네요. 그 직장에서 가장 기억에 남는 일은 무엇인가요?",
    },
    {
      title: "결혼식 날",
      question: "결혼식 날의 특별한 순간을 기억하시나요? 그날의 날씨나 기분, 가장 기억에 남는 순간을 말씀해 주세요.",
      followUp: "아름다운 추억이네요. 그날 가장 감동적이었던 순간은 무엇이었나요?",
    },
  ]

  const progress = ((currentStep + 1) / questions.length) * 100

  useEffect(() => {
    // AI 음성 재생 시뮬레이션
    if (isAITalking) {
      const timer = setTimeout(() => {
        setIsAITalking(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [currentStep, isAITalking])

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
      setIsAITalking(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 text-lg">
            <ArrowLeft className="w-5 h-5" />
            돌아가기
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">REC</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">노인 회상 훈련</h1>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">진행률</p>
            <p className="text-lg font-semibold text-blue-600">{Math.round(progress)}%</p>
          </div>
        </div>

        <Progress value={progress} className="mb-6 h-2" />

        {/* 메인 인터페이스 */}
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur overflow-hidden">
          <CardContent className="p-0">
            {/* AI 질문 영역 */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm opacity-90">AI 상담사 1/3</p>
                  <h3 className="text-xl font-bold">{questions[currentStep].title}</h3>
                </div>
                <Button variant="ghost" size="sm" className="ml-auto text-white hover:bg-white/20">
                  다시재생
                </Button>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <p className="text-lg leading-relaxed">{questions[currentStep].question}</p>
              </div>
            </div>

            {/* 비디오 영역 */}
            <div className="relative bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 aspect-video overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-2xl">
                  <Brain className="w-16 h-16 text-white" />
                </div>
              </div>

              {/* 배경 장식 */}
              <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
              <div
                className="absolute bottom-10 right-10 w-24 h-24 bg-purple-200/30 rounded-full blur-xl animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-200/30 rounded-full blur-xl animate-pulse"
                style={{ animationDelay: "2s" }}
              ></div>

              {/* 음성 파형 오버레이 */}
              {(isAITalking || isRecording) && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
                    <div className="flex items-center gap-3 mb-6">
                      {isRecording ? (
                        <>
                          <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-lg font-semibold text-gray-800">듣고 있어요...</span>
                        </>
                      ) : (
                        <>
                          <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-lg font-semibold text-gray-800">말하고 있어요...</span>
                        </>
                      )}
                    </div>

                    {/* 동적 파형 */}
                    <div className="flex items-center justify-center gap-2 h-20">
                      {[...Array(15)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 rounded-full transition-all duration-200 ${
                            isRecording
                              ? "bg-gradient-to-t from-red-400 via-red-500 to-red-600"
                              : "bg-gradient-to-t from-blue-400 via-blue-500 to-blue-600"
                          }`}
                          style={{
                            height: isRecording
                              ? `${Math.max(12, Math.min(60, audioLevel * 3 + Math.sin(Date.now() / 150 + i * 0.8) * 15))}px`
                              : `${20 + Math.sin(Date.now() / 300 + i * 0.6) * 18}px`,
                            opacity: 0.7 + Math.sin(Date.now() / 400 + i * 0.3) * 0.3,
                          }}
                        />
                      ))}
                    </div>

                    <div className="text-center mt-4">
                      <p className="text-sm text-gray-600">
                        {isRecording ? "편안하게 말씀해 주세요" : "잠시만 기다려 주세요"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {isRecording && (
                <div className="absolute top-6 left-6 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  녹음 중...
                </div>
              )}
            </div>

            {/* 컨트롤 영역 */}
            <div className="p-6 bg-gray-50">
              <div className="flex items-center justify-center gap-6">
                {/* 음량 조절 */}
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="lg" className="w-16 h-16 rounded-full bg-white shadow-md">
                    {volume > 0 ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                  </Button>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">음량</p>
                    <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                      <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${volume}%` }} />
                    </div>
                  </div>
                </div>

                {/* 녹음 버튼 */}
                <Button
                  size="lg"
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`w-20 h-20 rounded-full text-white font-medium shadow-lg transition-all ${
                    isRecording ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                </Button>
                <div className="text-center">
                  <p className="text-sm text-gray-600">{isRecording ? "중지" : "제출"}</p>
                </div>

                {/* 다음 버튼 */}
                <div className="flex items-center gap-3">
                  <Button
                    size="lg"
                    onClick={handleNext}
                    disabled={currentStep === questions.length - 1}
                    className="w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-md"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </Button>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">다음</p>
                  </div>
                </div>

                {/* 전체화면 */}
                <Button variant="ghost" size="lg" className="w-16 h-16 rounded-full bg-black text-white shadow-md">
                  <Maximize className="w-6 h-6" />
                </Button>
              </div>

              {/* 녹음된 오디오 재생 */}
              {recordedAudio && (
                <div className="mt-6 p-4 bg-white rounded-xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">방금 녹음한 내용</p>
                    <audio controls src={recordedAudio} className="h-8" />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 진행 단계 표시 */}
        <div className="mt-6 flex justify-center gap-4">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                index === currentStep
                  ? "bg-blue-500 text-white shadow-lg scale-110"
                  : index < currentStep
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              {index < currentStep ? <CheckCircle className="w-6 h-6" /> : index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 사진 회상 음성 훈련
export function VoicePhotoReminiscenceSession({ onBack }: VoiceSessionProps) {
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const [isAITalking, setIsAITalking] = useState(true)
  const [volume, setVolume] = useState(80)
  const { isRecording, audioLevel, recordedAudio, startRecording, stopRecording } = useVoiceRecording()

  const photos = [
    {
      src: "/placeholder.svg?height=400&width=600",
      title: "가족 사진",
      question:
        "이 가족 사진을 보시면서 떠오르는 기억을 자유롭게 말씀해 주세요. 언제 찍었는지, 누가 함께 있는지, 그날의 기분은 어땠는지 들려주세요.",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      title: "결혼 사진",
      question:
        "결혼 사진을 보며 그날의 특별한 순간들을 떠올려 보세요. 결혼식 장소나 가장 기억에 남는 순간, 그때의 감정을 말씀해 주세요.",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      title: "옛 집",
      question:
        "이 집 사진을 보시면서 그곳에서의 생활을 떠올려 보세요. 얼마나 살았는지, 가장 좋아했던 공간, 이웃들과의 추억을 들려주세요.",
    },
  ]

  const progress = ((currentPhoto + 1) / photos.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 text-lg">
            <ArrowLeft className="w-5 h-5" />
            돌아가기
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">REC</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">사진 회상 훈련</h1>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">진행률</p>
            <p className="text-lg font-semibold text-purple-600">{Math.round(progress)}%</p>
          </div>
        </div>

        <Progress value={progress} className="mb-6 h-2" />

        <div className="grid lg:grid-cols-2 gap-6">
          {/* 사진 영역 */}
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{photos[currentPhoto].title}</h3>
                <p className="text-gray-600">사진을 자세히 살펴보세요</p>
              </div>

              <div className="relative rounded-xl overflow-hidden mb-4">
                <img
                  src={photos[currentPhoto].src || "/placeholder.svg"}
                  alt={photos[currentPhoto].title}
                  className="w-full h-80 object-cover"
                />
              </div>

              <div className="flex justify-center gap-2">
                {photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPhoto(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentPhoto ? "bg-purple-500" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 음성 인터페이스 */}
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
            <CardContent className="p-0">
              {/* AI 질문 */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm opacity-90">AI 상담사</p>
                    <h3 className="text-xl font-bold">사진 속 기억들</h3>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <p className="leading-relaxed">{photos[currentPhoto].question}</p>
                </div>
              </div>

              {/* 비디오 영역 */}
              <div className="relative bg-gradient-to-br from-purple-100 via-pink-50 to-rose-100 aspect-video overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
                    <Camera className="w-16 h-16 text-white" />
                  </div>
                </div>

                {/* 배경 장식 */}
                <div className="absolute top-8 right-8 w-24 h-24 bg-purple-200/40 rounded-full blur-xl animate-pulse"></div>
                <div
                  className="absolute bottom-12 left-12 w-20 h-20 bg-pink-200/40 rounded-full blur-xl animate-pulse"
                  style={{ animationDelay: "1.5s" }}
                ></div>

                {/* 동일한 파형 오버레이 적용 */}
                {(isAITalking || isRecording) && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                      <div className="flex items-center gap-2 mb-4">
                        {isRecording ? (
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        ) : (
                          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        )}
                        <span className="text-sm font-medium text-gray-700">
                          {isRecording ? "듣고 있어요..." : "말하고 있어요..."}
                        </span>
                      </div>

                      {/* 동적 파형 */}
                      <div className="flex items-center justify-center gap-1 h-16">
                        {[...Array(12)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 rounded-full transition-all duration-150 ${
                              isRecording
                                ? "bg-gradient-to-t from-red-400 to-red-600"
                                : "bg-gradient-to-t from-blue-400 to-blue-600"
                            }`}
                            style={{
                              height: isRecording
                                ? `${Math.max(8, Math.min(48, audioLevel * 2 + Math.sin(Date.now() / 100 + i) * 8))}px`
                                : `${16 + Math.sin(Date.now() / 200 + i * 0.5) * 12}px`,
                              animationDelay: `${i * 0.1}s`,
                            }}
                          />
                        ))}
                      </div>

                      <div className="text-center mt-3">
                        <p className="text-xs text-gray-500">
                          {isRecording ? "편안하게 말씀해 주세요" : "잠시만 기다려 주세요"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {isRecording && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    녹음 중...
                  </div>
                )}
              </div>

              {/* 컨트롤 */}
              <div className="p-6 bg-gray-50">
                <div className="flex items-center justify-center gap-6">
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="lg" className="w-16 h-16 rounded-full bg-white shadow-md">
                      <Volume2 className="w-6 h-6" />
                    </Button>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">음량</p>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-20 h-20 rounded-full text-white font-medium shadow-lg transition-all ${
                      isRecording ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                  </Button>

                  <div className="flex items-center gap-3">
                    <Button
                      size="lg"
                      onClick={() => setCurrentPhoto(Math.min(photos.length - 1, currentPhoto + 1))}
                      disabled={currentPhoto === photos.length - 1}
                      className="w-16 h-16 rounded-full bg-purple-500 hover:bg-purple-600 text-white shadow-md"
                    >
                      <ArrowRight className="w-6 h-6" />
                    </Button>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">다음</p>
                    </div>
                  </div>

                  <Button variant="ghost" size="lg" className="w-16 h-16 rounded-full bg-black text-white shadow-md">
                    <Maximize className="w-6 h-6" />
                  </Button>
                </div>

                {recordedAudio && (
                  <div className="mt-6 p-4 bg-white rounded-xl shadow-sm">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">방금 녹음한 내용</p>
                      <audio controls src={recordedAudio} className="h-8" />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// 음악 치료 음성 훈련
export function VoiceMusicTherapySession({ onBack }: VoiceSessionProps) {
  const [currentSong, setCurrentSong] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isAITalking, setIsAITalking] = useState(true)
  const [volume, setVolume] = useState(80)
  const { isRecording, audioLevel, recordedAudio, startRecording, stopRecording } = useVoiceRecording()

  const songs = [
    {
      title: "고향의 봄",
      artist: "전통 동요",
      question:
        "이 '고향의 봄' 노래를 들으시면서 떠오르는 추억을 말씀해 주세요. 어린 시절 고향의 모습이나 봄날의 기억을 자유롭게 들려주세요.",
    },
    {
      title: "아리랑",
      artist: "전통 민요",
      question:
        "아리랑을 들으며 떠오르는 기억들을 나누어 주세요. 누구와 함께 불렀는지, 어떤 상황에서 들었는지 말씀해 주세요.",
    },
    {
      title: "사랑하는 마음",
      artist: "1960년대 가요",
      question: "이 노래와 함께한 특별한 추억이 있으신가요? 젊은 시절의 기억이나 소중한 사람과의 추억을 들려주세요.",
    },
  ]

  const progress = ((currentSong + 1) / songs.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 text-lg">
            <ArrowLeft className="w-5 h-5" />
            돌아가기
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">REC</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">음악 회상 훈련</h1>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">진행률</p>
            <p className="text-lg font-semibold text-green-600">{Math.round(progress)}%</p>
          </div>
        </div>

        <Progress value={progress} className="mb-6 h-2" />

        {/* 메인 인터페이스 */}
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur overflow-hidden">
          <CardContent className="p-0">
            {/* 음악 정보 및 AI 질문 */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Music className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1">{songs[currentSong].title}</h3>
                  <p className="text-lg opacity-90">{songs[currentSong].artist}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white hover:bg-white/20 w-12 h-12 rounded-full"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </Button>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <p className="leading-relaxed">{songs[currentSong].question}</p>
              </div>
            </div>

            {/* 비디오 영역 */}
            <div className="relative bg-gray-100 aspect-video">
              <img src="/placeholder.svg?height=400&width=600" alt="AI 상담사" className="w-full h-full object-cover" />

              {/* 음악 재생 시각화 */}
              {isPlaying && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                  <Music className="w-4 h-4" />
                  재생 중
                </div>
              )}

              {/* 음성 파형 오버레이 */}
              {(isAITalking || isRecording) && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center gap-2 mb-4">
                      {isRecording ? (
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      ) : (
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      )}
                      <span className="text-sm font-medium text-gray-700">
                        {isRecording ? "듣고 있어요..." : "말하고 있어요..."}
                      </span>
                    </div>

                    {/* 동적 파형 */}
                    <div className="flex items-center justify-center gap-1 h-16">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 rounded-full transition-all duration-150 ${
                            isRecording
                              ? "bg-gradient-to-t from-red-400 to-red-600"
                              : "bg-gradient-to-t from-blue-400 to-blue-600"
                          }`}
                          style={{
                            height: isRecording
                              ? `${Math.max(8, Math.min(48, audioLevel * 2 + Math.sin(Date.now() / 100 + i) * 8))}px`
                              : `${16 + Math.sin(Date.now() / 200 + i * 0.5) * 12}px`,
                            animationDelay: `${i * 0.1}s`,
                          }}
                        />
                      ))}
                    </div>

                    <div className="text-center mt-3">
                      <p className="text-xs text-gray-500">
                        {isRecording ? "편안하게 말씀해 주세요" : "잠시만 기다려 주세요"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {isRecording && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  녹음 중...
                </div>
              )}
            </div>

            {/* 컨트롤 영역 */}
            <div className="p-6 bg-gray-50">
              <div className="flex items-center justify-center gap-6">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="lg" className="w-16 h-16 rounded-full bg-white shadow-md">
                    <Volume2 className="w-6 h-6" />
                  </Button>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">음량</p>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`w-20 h-20 rounded-full text-white font-medium shadow-lg transition-all ${
                    isRecording ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                </Button>

                <div className="flex items-center gap-3">
                  <Button
                    size="lg"
                    onClick={() => setCurrentSong(Math.min(songs.length - 1, currentSong + 1))}
                    disabled={currentSong === songs.length - 1}
                    className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-md"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </Button>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">다음</p>
                  </div>
                </div>

                <Button variant="ghost" size="lg" className="w-16 h-16 rounded-full bg-black text-white shadow-md">
                  <Maximize className="w-6 h-6" />
                </Button>
              </div>

              {recordedAudio && (
                <div className="mt-6 p-4 bg-white rounded-xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">방금 녹음한 내용</p>
                    <audio controls src={recordedAudio} className="h-8" />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// 이야기 나누기 음성 훈련
export function VoiceStoryTellingSession({ onBack }: VoiceSessionProps) {
  const [currentTopic, setCurrentTopic] = useState(0)
  const [isAITalking, setIsAITalking] = useState(true)
  const [volume, setVolume] = useState(80)
  const { isRecording, audioLevel, recordedAudio, startRecording, stopRecording } = useVoiceRecording()

  const topics = [
    {
      title: "나의 첫 번째",
      icon: "🌟",
      question:
        "인생의 첫 경험들에 대해 이야기해 주세요. 첫 직장에서의 하루, 첫 데이트, 첫 아이를 봤을 때의 기분 등 기억나는 첫 경험을 자유롭게 말씀해 주세요.",
    },
    {
      title: "가장 행복했던 순간",
      icon: "😊",
      question:
        "인생에서 가장 행복했던 순간은 언제였나요? 누구와 함께 있을 때 가장 행복하셨는지, 어떤 성취가 가장 뿌듯했는지 들려주세요.",
    },
    {
      title: "나의 취미와 관심사",
      icon: "🎨",
      question:
        "좋아하셨던 취미나 관심사에 대해 말씀해 주세요. 어떤 활동을 즐기셨는지, 친구들과 함께 했던 일들을 자유롭게 이야기해 주세요.",
    },
    {
      title: "지혜와 조언",
      icon: "💡",
      question:
        "후세에 전하고 싶은 지혜나 조언이 있으시다면 들려주세요. 젊은 세대에게 해주고 싶은 말씀이나 인생에서 중요하다고 생각하는 것들을 나누어 주세요.",
    },
  ]

  const progress = ((currentTopic + 1) / topics.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 text-lg">
            <ArrowLeft className="w-5 h-5" />
            돌아가기
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">REC</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">이야기 나누기 훈련</h1>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">진행률</p>
            <p className="text-lg font-semibold text-orange-600">{Math.round(progress)}%</p>
          </div>
        </div>

        <Progress value={progress} className="mb-6 h-2" />

        {/* 메인 인터페이스 */}
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur overflow-hidden">
          <CardContent className="p-0">
            {/* 주제 및 AI 질문 */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl">
                  {topics[currentTopic].icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1">{topics[currentTopic].title}</h3>
                  <p className="text-lg opacity-90">당신의 소중한 이야기를 들려주세요</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <p className="leading-relaxed">{topics[currentTopic].question}</p>
              </div>
            </div>

            {/* 비디오 영역 */}
            <div className="relative bg-gray-100 aspect-video">
              <img src="/placeholder.svg?height=400&width=600" alt="AI 상담사" className="w-full h-full object-cover" />

              {/* 음성 파형 오버레이 */}
              {(isAITalking || isRecording) && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center gap-2 mb-4">
                      {isRecording ? (
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      ) : (
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      )}
                      <span className="text-sm font-medium text-gray-700">
                        {isRecording ? "듣고 있어요..." : "말하고 있어요..."}
                      </span>
                    </div>

                    {/* 동적 파형 */}
                    <div className="flex items-center justify-center gap-1 h-16">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 rounded-full transition-all duration-150 ${
                            isRecording
                              ? "bg-gradient-to-t from-red-400 to-red-600"
                              : "bg-gradient-to-t from-blue-400 to-blue-600"
                          }`}
                          style={{
                            height: isRecording
                              ? `${Math.max(8, Math.min(48, audioLevel * 2 + Math.sin(Date.now() / 100 + i) * 8))}px`
                              : `${16 + Math.sin(Date.now() / 200 + i * 0.5) * 12}px`,
                            animationDelay: `${i * 0.1}s`,
                          }}
                        />
                      ))}
                    </div>

                    <div className="text-center mt-3">
                      <p className="text-xs text-gray-500">
                        {isRecording ? "편안하게 말씀해 주세요" : "잠시만 기다려 주세요"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {isRecording && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  이야기 녹음 중...
                </div>
              )}
            </div>

            {/* 컨트롤 영역 */}
            <div className="p-6 bg-gray-50">
              <div className="flex items-center justify-center gap-6">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="lg" className="w-16 h-16 rounded-full bg-white shadow-md">
                    <Volume2 className="w-6 h-6" />
                  </Button>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">음량</p>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`w-20 h-20 rounded-full text-white font-medium shadow-lg transition-all ${
                    isRecording ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                </Button>

                <div className="flex items-center gap-3">
                  <Button
                    size="lg"
                    onClick={() => setCurrentTopic(Math.min(topics.length - 1, currentTopic + 1))}
                    disabled={currentTopic === topics.length - 1}
                    className="w-16 h-16 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-md"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </Button>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">다음</p>
                  </div>
                </div>

                <Button variant="ghost" size="lg" className="w-16 h-16 rounded-full bg-black text-white shadow-md">
                  <Maximize className="w-6 h-6" />
                </Button>
              </div>

              {recordedAudio && (
                <div className="mt-6 p-4 bg-white rounded-xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">방금 녹음한 이야기</p>
                    <audio controls src={recordedAudio} className="h-8" />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 주제 진행 상황 */}
        <div className="mt-6 grid grid-cols-4 gap-4">
          {topics.map((topic, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl text-center transition-all ${
                index === currentTopic
                  ? "bg-orange-500 text-white shadow-lg scale-105"
                  : index < currentTopic
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-500"
              }`}
            >
              <div className="text-3xl mb-2">{topic.icon}</div>
              <p className="text-sm font-medium">{topic.title}</p>
              {index < currentTopic && <CheckCircle className="w-4 h-4 mx-auto mt-2" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
