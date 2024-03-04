import ThemeClient from "../components/ThemeClient"
import StoreProvider from "../redux/StoreProvider"
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
          <StoreProvider> 
            {children}
          </StoreProvider>
        </ThemeClient>
      </body>
    </html>
  )
}
