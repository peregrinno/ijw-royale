"use client";

import "@/styles/globals.css";
import '@mantine/core/styles.css';
import { theme } from 'theme';
import { useState } from "react";
import { ReactNode } from "react";
import { MantineProvider, createTheme, MantineColorsTuple, rgba } from "@mantine/core";
import { Sidebar } from "@/components/Sidebar";
import Head from "next/head";



export default function RootLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang="pt-BR">
      <Head>
        <title>IJW - Royale</title>
        <meta name="description" content="O jogo rumo a santidade!" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bungee&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <MantineProvider
          theme={theme}
          defaultColorScheme="dark"
        >
          <div style={{ display: "flex", height: "100vh", backgroundColor: rgba("#020202", 1) }}>
            {/* Sidebar */}
            <Sidebar onSidebarToggle={setIsSidebarOpen} />

            {/* Conteúdo principal */}
            <main
              style={{
                flex: isSidebarOpen ? "calc(100% - 250px)" : "100%",
                transition: "flex 0.3s ease",
              }}
            >
              {children}
            </main>
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}
