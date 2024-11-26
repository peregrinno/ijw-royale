import { Card, Image, Text, Badge as BadgeUI } from '@mantine/core';
import { Badge } from '@/interfaces/Badge';

interface Props {
    badge: Badge;
}

export default function BadgeCard({ badge }: Props) {
    return (
        <Card shadow="sm" padding="lg">
            <Card.Section>
                <Image src={badge.image} alt={badge.name} height={160} />
            </Card.Section>
            <Text fw={500} mt="md">{badge.name}</Text>
            <BadgeUI color={badge.rarity === 'legendary' ? 'yellow' : 'blue'}>{badge.rarity}</BadgeUI>
        </Card>
    );
}
