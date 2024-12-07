'use client';

import { useState, useEffect } from 'react';
import { TextInput, Button, Container, Title, Alert, Anchor } from '@mantine/core';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

export default function RedeemPage() {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    // Verificação do token de autenticação
    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            router.push('/auth/login');
        }
    }, [router]);

    const handleRedeem = async () => {
        const token = localStorage.getItem('userToken');

        if (!token) {
            // Se o token não existir, redireciona para o login
            router.push('/auth/login');
            return;
        }

        try {
            const response = await api.get(`/badge/redeem?code=${code}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 201) {
                setSuccessMessage('Código resgatado com sucesso!');
                setError('');
                const userNickname = localStorage.getItem('userNickname');
                router.push(`/profile/${userNickname}`);
            }
        } catch (err: any) {
            if (err.response) {
                const { status } = err.response;
                if (status === 404) {
                    setError('Código não encontrado!');
                } else if (status === 406) {
                    setError('Código expirado!');
                }
            } else {
                setError('Erro ao tentar resgatar o código!');
            }
        }
    };

    return (
        <Container size="xs" mt={70}>
            <Title style={{ textAlign: 'center' }} mb="lg">Resgatar Código</Title>

            {/* Exibe erro ou sucesso */}
            {error && <Alert color="red" mb="md">{error}</Alert>}
            {successMessage && <Alert color="green" mb="md">{successMessage}</Alert>}

            <TextInput
                label="Digite o código"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                mt="sm"
            />

            <Button fullWidth onClick={handleRedeem} mt="md" color='#f7a40f'>
                Resgatar
            </Button>

            <Anchor
                href="/profile"
                mt="md"
                style={{ display: 'block', textAlign: 'center', color: '#f7a40f' }}
            >
                Voltar ao perfil
            </Anchor>
        </Container>
    );
}
