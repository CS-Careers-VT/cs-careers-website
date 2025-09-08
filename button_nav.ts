import { useNavigate } from "react-router-dom";

type NavigationTarget =
    | { type: "internal"; path: string }
    | { type: "section"; ref: React.RefObject<HTMLElement> }
    | { type: "external"; url: string };

export function handleButtonNav(
    target: NavigationTarget,
    navigate?: ReturnType<typeof useNavigate>
) {
    switch (target.type) {
        case "internal":
            navigate?.(target.path);
            break;
        case "section":
            target.ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            break;
        case "external":
            window.open(target.url, "_blank");
            break;
    }
}
