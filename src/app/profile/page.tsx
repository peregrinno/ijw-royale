'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

export default function ProfileRedirectPage() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('userToken');

        if (!token) {
            // Redireciona para login se não houver token
            router.push('/auth/login');
        } else {
            // Faz a requisição para obter o username do usuário
            api
                .get('/auth/me', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    const { nickname } = response.data;
                    router.push(`/profile/${nickname}`);
                })
                .catch(() => {
                    // Caso o token seja inválido, redireciona para login
                    localStorage.removeItem('userToken');
                    router.push('/auth/login');
                });
        }
    }, [router]);

    return null; // Nenhum conteúdo visível enquanto o redirecionamento acontece
}
