type IconProps = {
    name: "menu" | "close";
    size?: number;
    color?: string;
    margin?: string;
    onClick?: () => void;

};

export const Icon = ({ name, size = 36, color = "#1ABC9C", margin, onClick }: IconProps) => {
    const icons = {
        menu: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                width={size}
                height={size}
                fill={color}
            >
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
        ),
        close: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                width={size}
                height={size}
                fill={color}
            >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
        ),
    };

    const iconStyle: React.CSSProperties = {
        display: "inline-block",
        cursor: onClick ? "pointer" : "default",
        margin,
    };

    if (name === "menu") {
        Object.assign(iconStyle, {
            position: "absolute",
        });
    }

    return (
        <div onClick={onClick} style={iconStyle}>
            {icons[name]}
        </div>
    );
};