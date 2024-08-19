import React, { FC } from "react"
import "../assets/main.css"
import AmplifyConfig from "@/lib/awsConfig"
import { MobileViewProvider } from "@/context/MobileViewContext"
import { UserProvider } from "@/context/UserContext"
import { SignOutProvider } from "@/context/SignOutContext"
import { CartProvider } from "@/context/CartContext"
import { ToastProvider } from "@/context/ToastContext"
import { FavoritesProvider } from "@/context/FavoritesContext"
import Layout from "../layout/Layout"
import StyledComponentsRegistry from "../lib/registry"

const RootLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <script src="https://js.stripe.com/v3/" async></script>
      </head>
      <body>
        <React.StrictMode>
          <AmplifyConfig>
            <StyledComponentsRegistry>
              <MobileViewProvider>
                <ToastProvider>
                  <UserProvider>
                    <SignOutProvider>
                      <FavoritesProvider>
                        <CartProvider>
                          <Layout>{children}</Layout>
                        </CartProvider>
                      </FavoritesProvider>
                    </SignOutProvider>
                  </UserProvider>
                </ToastProvider>
              </MobileViewProvider>
            </StyledComponentsRegistry>
          </AmplifyConfig>
        </React.StrictMode>
        <div id="portal-root"></div>
      </body>
    </html>
  )
}

export default RootLayout