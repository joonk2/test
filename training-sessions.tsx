"use client"
import {
  VoiceMemoryTrainingSession,
  VoicePhotoReminiscenceSession,
  VoiceMusicTherapySession,
  VoiceStoryTellingSession,
} from "./voice-training-sessions"

interface SessionProps {
  onBack: () => void
}

// 기존 텍스트 기반 훈련들을 음성 기반으로 교체
export function MemoryTrainingSession({ onBack }: SessionProps) {
  return <VoiceMemoryTrainingSession onBack={onBack} />
}

export function PhotoReminiscenceSession({ onBack }: SessionProps) {
  return <VoicePhotoReminiscenceSession onBack={onBack} />
}

export function MusicTherapySession({ onBack }: SessionProps) {
  return <VoiceMusicTherapySession onBack={onBack} />
}

export function StoryTellingSession({ onBack }: SessionProps) {
  return <VoiceStoryTellingSession onBack={onBack} />
}
