"use client";

import { useEffect, useState } from 'react';
import { Card, Title, Badge, Image, Group } from '@mantine/core';
import api from '@/services/api';
import { BadgeInterface } from '@/interfaces/Badge';

export default function BadgeDetailPage({ params }: { params: { badgeId: string } }) {
    const [badge, setBadge] = useState<BadgeInterface | null>(null);

    useEffect(() => {
        api.get(`/badges/${params.badgeId}`).then((response) => setBadge(response.data));
    }, [params.badgeId]);

    if (!badge) return <div>Carregando...</div>;

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder h={300}>
            <Card.Section>
                <Image src={badge.image} alt={badge.name} radius="md" mb="lg" h={200} />
            </Card.Section>
            <Group justify="space-between" mt="md" mb="xs">
                <Title>{badge.name}</Title>
                <Badge color="dimmed" mt="xs">Raridade: {badge.rarity}</Badge>
            </Group>
        </Card >
    );
}
