"use client"

import { useState } from "react"
import MainPage from "../main-page"
import AuthNavigation from "../auth-navigation"

type PageType = "main" | "auth"

export default function Page() {
  const [currentPage, setCurrentPage] = useState<PageType>("main")

  if (currentPage === "auth") {
    return <AuthNavigation onBackToMain={() => setCurrentPage("main")} />
  }

  return <MainPage onNavigateToAuth={() => setCurrentPage("auth")} />
}
