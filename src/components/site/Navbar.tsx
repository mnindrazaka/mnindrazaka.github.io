import React, { useState } from "react";
import { Moon, Sun, Menu, X } from "@tamagui/lucide-icons";
import { useThemeSetting } from "@tamagui/next-theme";
import { Anchor, Button, Sheet, Text, XStack, YStack } from "tamagui";
import { useThemeTokens } from "@/theme/useThemeTokens";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Writing", href: "/writing" },
  { label: "Business", href: "/business" },
  { label: "POS System", href: "/pos-system" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const themeSetting = useThemeSetting();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { bg, text, textMuted, border, isDark, mounted } = useThemeTokens();

  return (
    <>
      <XStack
        tag="nav"
        aria-label="Main navigation"
        style={{ position: "sticky", top: 0, zIndex: 1000 }}
        backgroundColor={bg}
        borderBottomWidth={1}
        borderBottomColor={border}
        paddingHorizontal="$6"
        paddingVertical="$3"
        alignItems="center"
        justifyContent="space-between"
      >
        <Anchor href="/" textDecorationLine="none">
          <Text color={text} fontSize={17} fontWeight="700" letterSpacing={0.3}>
            M. Nindra Zaka
          </Text>
        </Anchor>

        {/* Desktop nav */}
        <XStack
          gap="$5"
          alignItems="center"
          display="none"
          $gtMd={{ display: "flex" }}
        >
          {NAV_LINKS.map((link) => (
            <Anchor key={link.href} href={link.href} textDecorationLine="none">
              <Text
                color={textMuted}
                fontSize={14}
                fontWeight="500"
                cursor="pointer"
                hoverStyle={{ color: text }}
              >
                {link.label}
              </Text>
            </Anchor>
          ))}
          <Button
            width={36}
            height={36}
            borderRadius={18}
            chromeless
            borderWidth={1}
            borderColor={border}
            color={text}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onPress={() => themeSetting.set(isDark ? "light" : "dark")}
            icon={isDark ? <Sun size={16} /> : <Moon size={16} />}
            pressStyle={{ opacity: 0.7, scale: 0.95 }}
          />
        </XStack>

        {/* Mobile controls */}
        <XStack gap="$2" alignItems="center" $gtMd={{ display: "none" }}>
          <Button
            width={36}
            height={36}
            borderRadius={18}
            chromeless
            borderWidth={1}
            borderColor={border}
            color={text}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onPress={() => themeSetting.set(isDark ? "light" : "dark")}
            icon={isDark ? <Sun size={16} /> : <Moon size={16} />}
            pressStyle={{ opacity: 0.7, scale: 0.95 }}
          />
          <Button
            width={36}
            height={36}
            borderRadius={18}
            chromeless
            borderWidth={1}
            borderColor={border}
            color={text}
            aria-label="Open navigation menu"
            onPress={() => setMobileOpen(true)}
            icon={<Menu size={18} />}
            pressStyle={{ opacity: 0.7, scale: 0.95 }}
          />
        </XStack>
      </XStack>

      {mounted && (
        <Sheet
          open={mobileOpen}
          onOpenChange={setMobileOpen}
          snapPoints={[55]}
          dismissOnSnapToBottom
          modal
          zIndex={10000}
        >
          <Sheet.Overlay backgroundColor="rgba(0,0,0,0.5)" />
          <Sheet.Frame backgroundColor={bg} padding="$5">
            <Sheet.Handle />
            <XStack justifyContent="flex-end" marginBottom="$2">
              <Button
                width={36}
                height={36}
                borderRadius={18}
                chromeless
                color={text}
                onPress={() => setMobileOpen(false)}
                icon={<X size={20} />}
              />
            </XStack>
            <YStack gap="$6">
              {NAV_LINKS.map((link) => (
                <Anchor
                  key={link.href}
                  href={link.href}
                  textDecorationLine="none"
                  onPress={() => setMobileOpen(false)}
                >
                  <Text color={text} fontSize={22} fontWeight="600">
                    {link.label}
                  </Text>
                </Anchor>
              ))}
            </YStack>
          </Sheet.Frame>
        </Sheet>
      )}
    </>
  );
}
