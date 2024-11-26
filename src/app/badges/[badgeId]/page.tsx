"use client";

import { useEffect, useState } from 'react';
import { Container, Title, Text, Image } from '@mantine/core';
import api from '@/services/api';
import { Badge } from '@/interfaces/Badge';

export default function BadgeDetailPage({ params }: { params: { badgeId: string } }) {
    const [badge, setBadge] = useState<Badge | null>(null);

    useEffect(() => {
        api.get(`/badges/${params.badgeId}`).then((response) => setBadge(response.data));
    }, [params.badgeId]);

    if (!badge) return <div>Carregando...</div>;

    return (
        <Container>
            <Image src={badge.image} alt={badge.name} radius="md" mb="lg" />
            <Title>{badge.name}</Title>
            <Text color="dimmed" mt="xs">Raridade: {badge.rarity}</Text>
        </Container>
    );
}
