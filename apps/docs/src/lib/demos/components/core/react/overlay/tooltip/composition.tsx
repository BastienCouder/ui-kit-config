import { Button } from "@/lib/components/core/default/react/buttons/button";
import { TooltipContent, TooltipRoot, TooltipTrigger } from "@/lib/components/core/default/react/overlay/tooltip";

export default function Demo() {
    return (
        <TooltipRoot delay={100}>
            <TooltipTrigger asChild>
                <Button>Hover</Button>
            </TooltipTrigger>
            <TooltipContent placement="right" offset={8}>
                <p>Add to library</p>
            </TooltipContent>
        </TooltipRoot>
    );
}
