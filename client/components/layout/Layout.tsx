import { Container } from "@mui/material"

type LayoutProps = {
    children?: React.ReactNode;
}

export const Layout = ({children}:LayoutProps) => {
    return(
        <Container maxWidth="md"  sx={{ marginY: 5 }}>
            {children}
        </Container>
    )
}