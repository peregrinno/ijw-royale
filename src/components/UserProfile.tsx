import { Avatar, Container, Title, Grid, Text } from '@mantine/core';
import { User } from '@/interfaces/User';
import BadgeCard from '@/components/BadgeCard';

interface Props {
    user: User;
}

export default function UserProfile({ user }: Props) {
    return (
        <Container>
            {/* Avatar do usuário */}
            <Avatar src={user.url_avatar} size="xl" radius="xl" mb="md" />

            {/* Nome do usuário */}
            <Title style={{ textAlign: 'center' }} mb="sm">{user.nickname}</Title>

            {/* Rank do usuário */}
            <Text style={{ textAlign: 'center', color: 'dimmed', marginTop: '8px' }} size="sm">
                Rank: #{user.rank}
            </Text>

            {/* Insígnias */}
            <Grid mt="lg">
                {user.badges.map((badge) => (
                    <Grid.Col key={badge.id} span={4}>
                        <BadgeCard badge={badge} />
                    </Grid.Col>
                ))}
            </Grid>
        </Container>
    );
}
