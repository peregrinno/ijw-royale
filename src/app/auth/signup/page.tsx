'use client';

import { useState } from 'react';
import { TextInput, PasswordInput, Button, Container, Title, Alert } from '@mantine/core';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

export default function SignUpPage() {
    const [nickname, setNickname] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
    const [isPasswordsMatch, setIsPasswordsMatch] = useState<boolean>(true);
    const [passwordStrength, setPasswordStrength] = useState<string>('');
    const router = useRouter();

    const validatePassword = (password: string): boolean => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // mínimo de 6 caracteres, alfanumérico
        return passwordRegex.test(password);
    };

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            setIsPasswordsMatch(false);
            return;
        }

        if (!isPasswordValid || password.length < 6) {
            setError('A senha precisa ter pelo menos 6 caracteres alfanuméricos');
            return;
        }

        try {
            await api.post('/auth/signup', { nickname, password });
            router.push('/auth/login');
        } catch (err) {
            setError('Erro ao criar conta. Tente novamente.');
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setIsPasswordValid(validatePassword(newPassword));
        if (newPassword.length < 6) {
            setPasswordStrength('Senha muito fraca');
        } else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(newPassword)) {
            setPasswordStrength('Senha forte');
        } else {
            setPasswordStrength('Senha média');
        }
    };

    return (
        <Container size="xs" mt={70}>
            <Title style={{ textAlign: 'center' }} mb="lg">Inscreva-se</Title>
            {error && <Alert color="red" mb="md">{error}</Alert>}
            <TextInput
                label="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
            />
            <PasswordInput
                label="Senha"
                value={password}
                onChange={handlePasswordChange}
                mt="sm"
                required
            />
            {password && (
                <div style={{ color: passwordStrength === 'Senha forte' ? 'green' : passwordStrength === 'Senha média' ? 'orange' : 'red' }}>
                    {passwordStrength}
                </div>
            )}
            <PasswordInput
                label="Confirmar Senha"
                value={confirmPassword}
                onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setIsPasswordsMatch(e.target.value === password);
                }}
                mt="sm"
                required
            />
            {!isPasswordsMatch && (
                <Alert color="red" mt="sm">As senhas não correspondem</Alert>
            )}
            <Button
                fullWidth
                onClick={handleSignUp}
                mt="md"
                disabled={!isPasswordValid || password.length < 6 || !isPasswordsMatch}
            >
                Criar Conta
            </Button>
        </Container>
    );
}
