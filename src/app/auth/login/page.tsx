'use client';

import { useState } from 'react';
import { TextInput, PasswordInput, Button, Container, Title, Alert } from '@mantine/core';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

export default function LoginPage() {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await api.post('/auth/login', { nickname, password });
            const { token } = response.data;
            localStorage.setItem('userToken', token);
            router.push(`/profile/${nickname}`);
        } catch (err) {
            setError('Credenciais inválidas, tente novamente.');
        }
    };

    return (
        <Container size="xs" mt={70}>
            <Title style={{ textAlign: 'center' }} mb="lg">Login</Title>
            {error && <Alert color="red" mb="md">{error}</Alert>}
            <TextInput label="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
            <PasswordInput label="Senha" value={password} onChange={(e) => setPassword(e.target.value)} mt="sm" required />
            <Button fullWidth onClick={handleLogin} mt="md">Entrar</Button>
        </Container>
    );
}
