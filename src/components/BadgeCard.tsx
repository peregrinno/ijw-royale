import { Card, Image, Text, Badge as BadgeUI } from '@mantine/core';
import { BadgeInterface } from '@/interfaces/Badge';

interface Props {
    badge: BadgeInterface;
}

export default function BadgeCard({ badge }: Props) {
    return (
        <Card shadow="sm" padding="lg" miw={300} h={470}>
            <Card.Section>
                <Image src={badge.image} alt={badge.name} height={350} />
            </Card.Section>
            <Text fw={500} mih={70} mt="md">{badge.name}</Text>
            <BadgeUI color={badge.rarity === 'Sanctum' ? 'yellow' : 'blue'}>{badge.rarity}</BadgeUI>
        </Card>
    );
}
