import React from "react";
import { YStack, YStackProps } from "tamagui";
import { layout } from "@/theme/tokens";

type SectionProps = YStackProps & {
  children: React.ReactNode;
};

export function Section({ children, ...props }: SectionProps) {
  return (
    <YStack paddingVertical="$12" alignItems="center" {...props}>
      <YStack
        width="100%"
        maxWidth={layout.maxWidth}
        paddingHorizontal={layout.containerPadding}
      >
        {children}
      </YStack>
    </YStack>
  );
}
