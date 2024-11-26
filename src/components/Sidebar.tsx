"use client";

import { useState, useEffect } from "react";
import { Box, Text } from "@mantine/core";
import { Icon } from "./Icon";

const menuItems: { name: string; link: string }[] = [
    { name: "Jogadores", link: "/players" },
    { name: "Meu Perfil", link: "/profile/" },
    { name: "Resgatar", link: "/redeem" },
];


export function Sidebar({ onSidebarToggle }: { onSidebarToggle: (isOpen: boolean) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    const toggleSidebar = (state: boolean) => {
        setIsOpen(state);
        onSidebarToggle(state);
    };

    return (
        <>
            {/* Botão Hamburger */}
            {!isOpen && (
                <Icon
                    name="menu"
                    size={36}
                    color="#1ABC9C"
                    margin="28px 0px 0px 25px"
                    onClick={() => toggleSidebar(true)}
                />
            )}

            {/* Sidebar */}
            <Box
                style={{
                    position: "relative",
                    width: isOpen ? "250px" : "0",
                    marginLeft: "5px",
                    top: "1vh",
                    height: "98vh",
                    backgroundColor: "#2C3E50",
                    color: "#ECF0F1",
                    display: isOpen ? "flex" : "none",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "width 0.3s ease",
                    borderRadius: "15px"
                }}
            >
                {/* Cabeçalho */}
                <Box style={{ padding: "20px", display: "flex", justifyContent: "space-between" }}>
                    <Text
                        style={{
                            fontWeight: 700,
                            fontSize: "1.5rem",
                            color: "#ECF0F1",
                        }}
                    >
                        IJW Royale
                    </Text>
                    {/* Botão Fechar */}
                    <Icon
                        name="close"
                        size={36}
                        color="#1ABC9C"
                        onClick={() => toggleSidebar(false)}
                    />
                </Box>

                {/* Navegação */}
                <Box
                    style={{
                        padding: "10px",
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                    }}
                >
                    {menuItems.map((item, index) => (
                        <Text
                            component="a"
                            href={item.link}
                            key={index}
                            style={{
                                padding: "10px 15px",
                                borderRadius: "4px",
                                cursor: "pointer",
                                backgroundColor: "#34495E",
                                textDecoration: "none",
                                color: "#ECF0F1",
                                transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = "#1ABC9C")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "#34495E")
                            }
                        >
                            {item.name}
                        </Text>
                    ))}

                </Box>

                {/* Rodapé */}
                <Box
                    style={{
                        padding: "10px",
                        textAlign: "center",
                        fontSize: "0.8rem",
                    }}
                >
                    © 2024 IJW Royale
                </Box>
            </Box>
        </>
    );
}