import { useState } from "react";
import styles from "../../styles/AnimatedButton.module.css";

interface AnimatedButton {
    label: string;
    greyBorder: boolean;
}

export default function AnimatedButton({ label, greyBorder }: AnimatedButton) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="flex ">
            <div className="flex">{label}</div>
        </div>
    );
}
