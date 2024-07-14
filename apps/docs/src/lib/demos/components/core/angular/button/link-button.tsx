import { Button } from "@/lib/components/core/default/react/button";
import { LogInIcon } from "@/lib/icons";

export default function Demo() {
  return (
    <Button href="/login" prefix={<LogInIcon />} target="_blank">
      Login
    </Button>
  );
}
