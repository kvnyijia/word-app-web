import ThemeClient from "../components/ThemeClient"
// import { ColorModeScript } from "@chakra-ui/react"

export const metadata = {
  title: 'Word Cards',
  description: 'Online flashcards maker',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Make Color mode to persists when you refresh the page. */}
        {/* <ColorModeScript /> */}
        <ThemeClient>
          {children}
        </ThemeClient>
      </body>
    </html>
  )
}
