import type { ThemeOptions } from "@mui/material/styles";

export const components: ThemeOptions["components"] = {
    MuiAppBar: {
        styleOverrides: {
            root: {
                backgroundColor: "white",
                "& 	.MuiToolbar-root": {
                    color: "black",
                },
            },
        },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                "& .MuiPaper-elevation": {
                    backgroundColor: "white",
                },
            },
        },
    },

    MuiTextField: {
        styleOverrides: {
            root: {
                "& fieldset": {
                    // backgroundColor: "white"
                },
                "& .MuiSvgIcon-root": {
                    fill: "black",
                },
            },
        },
        defaultProps: {
            variant: "outlined",
        },
    },
    MuiDialogTitle: {
        styleOverrides: {
            root: {
                fontSize: "1.125rem",
            },
        },
    },
};

function isModifiedEvent(event: React.MouseEvent) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
