import { Loader, Box } from "@mantine/core";

export default function LoadingSpinner() {
    return (
        <Box
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh", // Ocupa toda a altura da tela
            }}
        >
            <Loader size="xl" variant="dots" color="cyan" />
        </Box>
    );
}
