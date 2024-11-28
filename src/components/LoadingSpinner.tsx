import { Loader, Box } from "@mantine/core";

export default function LoadingSpinner() {
    return (
        <Box
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Loader size="xl" variant="dots" color="#f7a40f" />
        </Box>
    );
}
