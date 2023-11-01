"use client";

import SubscriptionButton from "@/components/subscription-button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useUpgradePlanStore } from "@/stores/upgrade-plan-store";
import { FC } from "react";

interface UpgradeProModalProps {
  isProPlan: boolean;
}

const UpgradeProModal: FC<UpgradeProModalProps> = ({ isProPlan }) => {
  const { isOpen, onClose } = useUpgradePlanStore();

  return (
    <Dialog open={isOpen}>
      <DialogContent showOverlay onClick={onClose}>
        <SubscriptionButton isPro={isProPlan} />
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeProModal;
