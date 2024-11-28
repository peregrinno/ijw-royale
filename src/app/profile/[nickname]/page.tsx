'use client';

import { useEffect, useState } from 'react';
import { Avatar, Container, Title, Grid, Text, Image } from '@mantine/core';
import api from '@/services/api';
import { User } from '@/interfaces/User';
import BadgeCard from '@/components/BadgeCard';
import { useRouter } from 'next/navigation';
import LoadingSpinner from "@/components/LoadingSpinner";
import { motion } from 'framer-motion';

export default function ProfilePage({ params }: { params: { nickname: string } }) {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            // Redireciona para login se não houver token
            router.push('/auth/login');
            return;
        }

        if (params.nickname) {
            // Busca os dados do usuário
            api
                .get(`/profile/${params.nickname}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => setUser(response.data))
                .catch((err) => {
                    console.error(err);
                    setError('Erro ao carregar o perfil do usuário.');
                });
        }
    }, [params.nickname, router]);

    if (error) return <div>{error}</div>;
    if (!user) return <LoadingSpinner />;

    return (
        <Container size={'xl'} mt={70} style={{ position: 'relative' }}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Image
                    radius="md"
                    h={200}
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
                />
            </motion.div>

            {/* Avatar do usuário com sobreposição e sombra */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <Avatar
                    src={user.url_avatar}
                    radius="xl"
                    mb="md"
                    w={200}
                    h={200}
                    ml={30}
                    style={{
                        position: 'absolute',
                        top: 150,
                        left: 30,
                        zIndex: 10,
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                />
            </motion.div>

            <Container mt={200} mb={100}></Container>

            {/* Nome do usuário */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
            >
                <Title style={{ textAlign: 'left' }} mb="sm">
                    {user.nickname}
                </Title>
            </motion.div>

            {/* Rank do usuário */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.3 }}
            >
                <Text style={{ textAlign: 'left', color: 'gray', marginTop: '8px' }} size="sm">
                    Rank: {user.rank}
                </Text>
            </motion.div>

            {/* Insígnias */}
            <Grid mt="lg">
                {user.badges.map((badge) => (
                    <Grid.Col
                        key={badge.uuid}
                        span={{ base: 12, md: 6, lg: 3 }}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1.5 }}
                        >
                            <BadgeCard badge={badge} />
                        </motion.div>
                    </Grid.Col>
                ))}
            </Grid>
        </Container>
    );
}
