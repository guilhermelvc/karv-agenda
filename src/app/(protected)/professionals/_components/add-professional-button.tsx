"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import UpsertProfessionalForm from "./upsert-professional-form";

const AddProfessionalButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Adicionar médico
        </Button>
      </DialogTrigger>
      <UpsertProfessionalForm
        onSuccess={() => setIsOpen(false)}
        isOpen={isOpen}
      />
    </Dialog>
  );
};

export default AddProfessionalButton;
