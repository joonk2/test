"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Mic, MicOff, Volume2, VolumeX, CheckCircle, Maximize, Brain, Heart } from "lucide-react"

interface VoiceSessionProps {
  onBack: () => void
}

// 음성 녹음 훅 (기존과 동일)
function useVoiceRecording() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const animationFrameRef = useRef<number>()

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

      analyser.fftSize = 256
      const dataArray = new Uint8Array(analyser.frequencyBinCount)

      const updateAudioLevel = () => {
        if (isRecording) {
          analyser.getByteFrequencyData(dataArray)
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length
          setAudioLevel(average)
          animationFrameRef.current = requestAnimationFrame(updateAudioLevel)
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

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

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

// 동적 파형 컴포넌트
function VoiceWaveform({
  isRecording,
  audioLevel,
  isAITalking,
}: { isRecording: boolean; audioLevel: number; isAITalking: boolean }) {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
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
        {[...Array(15)].map((_, i) => {
          const baseHeight = 20
          const waveHeight = isRecording
            ? Math.max(12, Math.min(60, audioLevel * 2 + Math.sin(time * 0.1 + i * 0.8) * 15))
            : baseHeight + Math.sin(time * 0.05 + i * 0.6) * 18

          return (
            <div
              key={i}
              className={`w-2 rounded-full transition-all duration-200 ${
                isRecording
                  ? "bg-gradient-to-t from-red-400 via-red-500 to-red-600"
                  : "bg-gradient-to-t from-blue-400 via-blue-500 to-blue-600"
              }`}
              style={{
                height: `${waveHeight}px`,
                opacity: 0.7 + Math.sin(time * 0.08 + i * 0.3) * 0.3,
                transform: `scaleY(${0.8 + Math.sin(time * 0.06 + i * 0.4) * 0.2})`,
              }}
            />
          )
        })}
      </div>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">{isRecording ? "편안하게 말씀해 주세요" : "잠시만 기다려 주세요"}</p>
      </div>
    </div>
  )
}

// 개선된 기억 되살리기 음성 훈련
export function VoiceMemoryTrainingSession({ onBack }: VoiceSessionProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAITalking, setIsAITalking] = useState(true)
  const [volume, setVolume] = useState(80)
  const { isRecording, audioLevel, recordedAudio, startRecording, stopRecording } = useVoiceRecording()

  const questions = [
    {
      title: "어린 시절의 집",
      question:
        "어린 시절 살았던 집은 어떤 모습이었나요? 집의 색깔이나 마당, 가장 좋아했던 방에 대해 자유롭게 말씀해 주세요.",
    },
    {
      title: "첫 직장의 기억",
      question: "첫 직장에서의 기억을 들려주세요. 첫 출근날의 기분이나 동료들과의 추억을 말씀해 주세요.",
    },
    {
      title: "결혼식 날",
      question: "결혼식 날의 특별한 순간을 기억하시나요? 그날의 날씨나 기분, 가장 기억에 남는 순간을 말씀해 주세요.",
    },
  ]

  const progress = ((currentStep + 1) / questions.length) * 100

  useEffect(() => {
    if (isAITalking) {
      const timer = setTimeout(() => {
        setIsAITalking(false)
      }, 4000)
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
            <h1 className="text-2xl font-bold text-gray-800">기억 되살리기 훈련</h1>
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
                  <p className="text-sm opacity-90">
                    AI 상담사 {currentStep + 1}/{questions.length}
                  </p>
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

            {/* 개선된 비디오 영역 */}
            <div className="relative bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 aspect-video overflow-hidden">
              {/* AI 아바타 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-2xl">
                  <Heart className="w-20 h-20 text-white" />
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
                  <VoiceWaveform isRecording={isRecording} audioLevel={audioLevel} isAITalking={isAITalking} />
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
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-16 h-16 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
                  >
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
                <div className="text-center">
                  <Button
                    size="lg"
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-20 h-20 rounded-full text-white font-medium shadow-lg transition-all transform hover:scale-105 ${
                      isRecording ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">{isRecording ? "중지" : "녹음"}</p>
                </div>

                {/* 다음 버튼 */}
                <div className="flex items-center gap-3">
                  <Button
                    size="lg"
                    onClick={handleNext}
                    disabled={currentStep === questions.length - 1}
                    className="w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </Button>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">다음</p>
                  </div>
                </div>

                {/* 전체화면 */}
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-16 h-16 rounded-full bg-black text-white shadow-md hover:shadow-lg transition-all"
                >
                  <Maximize className="w-6 h-6" />
                </Button>
              </div>

              {/* 녹음된 오디오 재생 */}
              {recordedAudio && (
                <div className="mt-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <p className="text-sm font-medium text-gray-700">방금 녹음한 내용</p>
                    </div>
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

// 다른 세션들도 동일한 방식으로 개선...
export function VoicePhotoReminiscenceSession({ onBack }: VoiceSessionProps) {
  // 사진 회상 훈련 구현 (Camera 아이콘과 보라색 테마)
  return <div>사진 회상 훈련 (개선된 버전)</div>
}

export function VoiceMusicTherapySession({ onBack }: VoiceSessionProps) {
  // 음악 치료 훈련 구현 (Music 아이콘과 초록색 테마)
  return <div>음악 치료 훈련 (개선된 버전)</div>
}

export function VoiceStoryTellingSession({ onBack }: VoiceSessionProps) {
  // 이야기 나누기 훈련 구현 (BookOpen 아이콘과 주황색 테마)
  return <div>이야기 나누기 훈련 (개선된 버전)</div>
}
